import { AlertCircle, AlertTriangle, ArrowDown, ArrowUp, Clock, FileText, Filter, Info } from 'lucide-react';
import React from 'react';
import Sidebar from '../../components/admin/Sidebar';
import { useAuthContext } from '../../contexts/AuthContext';

const LogsAdmin = () => {
  const { user } = useAuthContext();
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filter, setFilter] = React.useState('all');
  const [sortKey, setSortKey] = React.useState('timestamp');
  const [sortDir, setSortDir] = React.useState('desc');

  React.useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/admin/logs', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch logs');
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        setError(err.message || 'Failed to fetch logs');
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, []);

  // Parse log entries to extract timestamp, level, and message
  const parseLogEntry = (logLine) => {
    // Parse user activity logs format: timestamp [USER_ACTIVITY]: User userId performed action - message (details)
    const userActivityMatch = logLine.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s+\[USER_ACTIVITY\]:\s*User\s+([^\s]+)\s+performed\s+([^-]+)\s+-\s*(.+?)(?:\s+\((.+)\))?$/);

    if (userActivityMatch) {
      return {
        timestamp: userActivityMatch[1],
        level: 'USER_ACTIVITY',
        userId: userActivityMatch[2],
        action: userActivityMatch[3].trim(),
        message: userActivityMatch[4].trim(),
        details: userActivityMatch[5] || null,
        raw: logLine
      };
    }

    // Fallback for other log formats
    const logMatch = logLine.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s+\[(INFO|ERROR|WARN|DEBUG)\]:\s*(.+)$/);

    if (logMatch) {
      return {
        timestamp: logMatch[1],
        level: logMatch[2],
        message: logMatch[3],
        raw: logLine
      };
    }

    // If still no match, try to extract timestamp and level manually
    const timestampMatch = logLine.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/);
    const levelMatch = logLine.match(/\[(INFO|ERROR|WARN|DEBUG|USER_ACTIVITY)\]/);

    if (timestampMatch && levelMatch) {
      // Find the position of the level to extract the message
      const levelStart = logLine.indexOf(`[${levelMatch[1]}]`);
      const messageStart = logLine.indexOf(':', levelStart);
      const message = messageStart !== -1 ? logLine.substring(messageStart + 1).trim() : logLine.substring(levelStart + levelMatch[1].length + 2).trim();

      return {
        timestamp: timestampMatch[1],
        level: levelMatch[1],
        message: message,
        raw: logLine
      };
    }

    // Fallback for unparseable logs
    return {
      timestamp: '',
      level: 'INFO',
      message: logLine,
      raw: logLine
    };
  };

  const parsedLogs = logs.map(parseLogEntry);

  // Filter logs based on selected filter
  const getFilteredLogs = () => {
    if (filter === 'all') return parsedLogs.filter(log => log.level === 'USER_ACTIVITY');

    return parsedLogs.filter(log => {
      // Only show user activity logs
      if (log.level !== 'USER_ACTIVITY') return false;

      const action = log.action?.toLowerCase() || '';
      const message = log.message.toLowerCase();

      switch (filter) {
        case 'user-activity':
          return action.includes('registration') ||
            action.includes('login') ||
            action.includes('logout') ||
            action.includes('donation') ||
            action.includes('campaign') ||
            action.includes('profile') ||
            action.includes('admin');
        case 'donations':
          return action.includes('donation');
        case 'registrations':
          return action.includes('registration');
        case 'logins':
          return action.includes('login') || action.includes('logout');
        case 'admin-actions':
          return action.includes('admin');
        case 'errors':
          return log.level === 'ERROR';
        default:
          return true;
      }
    });
  };

  // Sorting logic
  const getSortedLogs = (logs) => {
    const sorted = [...logs].sort((a, b) => {
      let aVal = a[sortKey] || '';
      let bVal = b[sortKey] || '';
      if (sortKey === 'timestamp') {
        aVal = aVal ? new Date(aVal).getTime() : 0;
        bVal = bVal ? new Date(bVal).getTime() : 0;
      } else {
        aVal = aVal.toString().toLowerCase();
        bVal = bVal.toString().toLowerCase();
      }
      if (aVal < bVal) return sortDir === 'asc' ? -1 : 1;
      if (aVal > bVal) return sortDir === 'asc' ? 1 : -1;
      return 0;
    });
    return sorted;
  };

  const filteredLogs = getSortedLogs(getFilteredLogs());

  if (user === undefined) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center h-64">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-2xl mx-auto py-16 text-center">
          <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
          <p className="text-gray-600">You do not have permission to view this page.</p>
        </div>
      </div>
    );
  }

  const getLevelIcon = (level) => {
    switch (level) {
      case 'ERROR': return <AlertCircle size={16} className="text-red-500" />;
      case 'WARN': return <AlertTriangle size={16} className="text-yellow-500" />;
      case 'DEBUG': return <Clock size={16} className="text-gray-500" />;
      default: return <Info size={16} className="text-blue-500" />;
    }
  };

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'bg-red-50 text-red-700 border-red-200';
      case 'WARN': return 'bg-yellow-50 text-yellow-700 border-yellow-200';
      case 'DEBUG': return 'bg-gray-50 text-gray-700 border-gray-200';
      default: return 'bg-green-50 text-green-700 border-green-200';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />
      <div className="lg:ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-2">Activity Logs</h1>
          <p className="text-gray-600">Monitor system activity and track user actions</p>
        </div>

        {/* Log Statistics - moved to top */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total User Activities</p>
                <p className="text-2xl font-bold text-gray-900">{parsedLogs.filter(log => log.level === 'USER_ACTIVITY').length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <FileText className="text-blue-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">User Registrations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {parsedLogs.filter(log => log.level === 'USER_ACTIVITY' && log.action?.includes('REGISTRATION')).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Info className="text-green-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Donations</p>
                <p className="text-2xl font-bold text-gray-900">
                  {parsedLogs.filter(log => log.level === 'USER_ACTIVITY' && log.action?.includes('DONATION')).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-xl flex items-center justify-center">
                <AlertTriangle className="text-yellow-600" size={24} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Actions</p>
                <p className="text-2xl font-bold text-gray-900">
                  {parsedLogs.filter(log => log.level === 'USER_ACTIVITY' && log.action?.includes('ADMIN')).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center">
                <AlertCircle className="text-red-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Filter Controls */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
          <div className="flex items-center gap-4">
            <Filter className="text-gray-400" size={20} />
            <label className="text-sm font-semibold text-gray-700">Filter Logs:</label>
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="border border-gray-300 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All User Activities</option>
              <option value="user-activity">All User Actions</option>
              <option value="donations">Donations & Payments</option>
              <option value="registrations">User Registrations</option>
              <option value="logins">User Logins/Logouts</option>
              <option value="admin-actions">Admin Actions</option>
              <option value="errors">Errors Only</option>
            </select>
          </div>
        </div>

        {/* Logs Table */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          {loading ? (
            <div className="flex justify-center items-center py-16">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Loading logs...</span>
            </div>
          ) : error ? (
            <div className="text-center py-16 text-red-600">{error}</div>
          ) : filteredLogs.length === 0 ? (
            <div className="text-center py-16">
              <FileText className="mx-auto text-gray-300 mb-4" size={48} />
              <p className="text-gray-600">No logs found for the selected filter.</p>
            </div>
          ) : (
            <div className="max-h-[600px] overflow-y-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200 sticky top-0">
                  <tr>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer select-none" onClick={() => {
                      if (sortKey === 'timestamp') setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      setSortKey('timestamp');
                    }}>
                      Timestamp
                      {sortKey === 'timestamp' && (sortDir === 'asc' ? <ArrowUp className="inline ml-1 w-4 h-4" /> : <ArrowDown className="inline ml-1 w-4 h-4" />)}
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer select-none" onClick={() => {
                      if (sortKey === 'userId') setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      setSortKey('userId');
                    }}>
                      User ID
                      {sortKey === 'userId' && (sortDir === 'asc' ? <ArrowUp className="inline ml-1 w-4 h-4" /> : <ArrowDown className="inline ml-1 w-4 h-4" />)}
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer select-none" onClick={() => {
                      if (sortKey === 'action') setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      setSortKey('action');
                    }}>
                      Action
                      {sortKey === 'action' && (sortDir === 'asc' ? <ArrowUp className="inline ml-1 w-4 h-4" /> : <ArrowDown className="inline ml-1 w-4 h-4" />)}
                    </th>
                    <th className="text-left py-4 px-6 font-semibold text-gray-900 cursor-pointer select-none" onClick={() => {
                      if (sortKey === 'message') setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
                      setSortKey('message');
                    }}>
                      Details
                      {sortKey === 'message' && (sortDir === 'asc' ? <ArrowUp className="inline ml-1 w-4 h-4" /> : <ArrowDown className="inline ml-1 w-4 h-4" />)}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredLogs.map((log, idx) => (
                    <tr key={idx} className={`border-b border-gray-100 ${idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}`}>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <Clock size={14} className="text-gray-400" />
                          <span className="font-mono text-sm text-gray-600">
                            {log.timestamp ? new Date(log.timestamp).toLocaleString() : '-'}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="font-mono text-sm text-gray-700">
                          {log.userId || 'anonymous'}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          {getLevelIcon(log.level)}
                          <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getLevelColor(log.level)}`}>
                            {log.action || log.level}
                          </span>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm text-gray-700 break-words max-w-md">
                          <div className="font-medium">{log.message}</div>
                          {log.details && (
                            <div className="text-xs text-gray-500 mt-1">{log.details}</div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Summary Stats */}
        <div className="mt-6 text-center text-sm text-gray-500">
          Showing {filteredLogs.length} of {parsedLogs.length} log entries
        </div>
      </div>
    </div>
  );
};

export default LogsAdmin; 