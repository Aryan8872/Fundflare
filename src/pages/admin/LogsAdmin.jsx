import React from 'react';
import { useAuthContext } from '../../contexts/AuthContext';

const LogsAdmin = () => {
  const { user } = useAuthContext();
  const [logs, setLogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);
  const [filter, setFilter] = React.useState('all');

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
    // More robust regex to handle the actual log format
    const logMatch = logLine.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s+\[(INFO|ERROR|WARN|DEBUG)\]:\s*(.+)$/);

    if (logMatch) {
      return {
        timestamp: logMatch[1],
        level: logMatch[2],
        message: logMatch[3],
        raw: logLine
      };
    }

    // If the above doesn't match, try a simpler approach
    const simpleMatch = logLine.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)\s*\[(INFO|ERROR|WARN|DEBUG)\]:\s*(.+)$/);

    if (simpleMatch) {
      return {
        timestamp: simpleMatch[1],
        level: simpleMatch[2],
        message: simpleMatch[3],
        raw: logLine
      };
    }

    // If still no match, try to extract timestamp and level manually
    const timestampMatch = logLine.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z)/);
    const levelMatch = logLine.match(/\[(INFO|ERROR|WARN|DEBUG)\]/);

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
    if (filter === 'all') return parsedLogs;

    return parsedLogs.filter(log => {
      const message = log.message.toLowerCase();

      switch (filter) {
        case 'user-activity':
          return message.includes('user registered') ||
            message.includes('user login') ||
            message.includes('otp sent') ||
            message.includes('otp verified') ||
            message.includes('donation created') ||
            message.includes('campaign') ||
            message.includes('payout');
        case 'donations':
          return message.includes('donation created') ||
            message.includes('stripe session') ||
            message.includes('webhook');
        case 'errors':
          return log.level === 'ERROR';
        case 'registrations':
          return message.includes('user registered');
        case 'logins':
          return message.includes('user login') || message.includes('otp');
        default:
          return true;
      }
    });
  };

  const filteredLogs = getFilteredLogs();

  if (user === undefined) return <div>Loading...</div>;
  if (!user || user.role !== 'ADMIN') {
    return (
      <div className="max-w-2xl mx-auto py-16 text-center">
        <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
        <p className="text-gray-600">You do not have permission to view this page.</p>
      </div>
    );
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'ERROR': return 'text-red-600 bg-red-50';
      case 'WARN': return 'text-yellow-600 bg-yellow-50';
      case 'DEBUG': return 'text-gray-600 bg-gray-50';
      default: return 'text-green-600 bg-green-50';
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #e0e7ff 0%, #f5f7fa 100%)', color: '#222', padding: '2rem 0' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(10,88,247,0.08)', padding: '2rem' }}>
        <h1 style={{ fontSize: 28, fontWeight: 800, marginBottom: 24, textAlign: 'center', color: '#0a58f7' }}>Activity Logs</h1>

        {/* Filter Controls */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', alignItems: 'center' }}>
          <label style={{ fontWeight: 600, color: '#374151' }}>Filter:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            style={{
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #d1d5db',
              backgroundColor: '#fff',
              fontSize: '14px',
              fontWeight: 500
            }}
          >
            <option value="all">All Logs</option>
            <option value="user-activity">User Activity</option>
            <option value="donations">Donations & Payments</option>
            <option value="registrations">User Registrations</option>
            <option value="logins">User Logins</option>
            <option value="errors">Errors Only</option>
          </select>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>Loading logs...</div>
        ) : error ? (
          <div style={{ color: 'red', textAlign: 'center', padding: '2rem' }}>{error}</div>
        ) : filteredLogs.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem' }}>No logs found for the selected filter.</div>
        ) : (
          <div style={{ maxHeight: 600, overflowY: 'auto', borderRadius: 12, border: '1px solid #e0e7ef' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f9fafb' }}>
              <thead style={{ background: '#e0e7ff', position: 'sticky', top: 0 }}>
                <tr>
                  <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Timestamp</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Level</th>
                  <th style={{ padding: '12px 16px', fontWeight: 700, textAlign: 'left', borderBottom: '2px solid #cbd5e1' }}>Message</th>
                </tr>
              </thead>
              <tbody>
                {filteredLogs.map((log, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: idx % 2 === 0 ? '#ffffff' : '#f8fafc' }}>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '12px', color: '#64748b' }}>
                      {log.timestamp ? new Date(log.timestamp).toLocaleString() : '-'}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: 600,
                        ...(log.level === 'ERROR' && { color: '#dc2626', backgroundColor: '#fef2f2' }),
                        ...(log.level === 'WARN' && { color: '#d97706', backgroundColor: '#fffbeb' }),
                        ...(log.level === 'DEBUG' && { color: '#6b7280', backgroundColor: '#f9fafb' }),
                        ...(log.level === 'INFO' && { color: '#059669', backgroundColor: '#f0fdf4' })
                      }}>
                        {log.level}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontFamily: 'monospace', fontSize: '13px', wordBreak: 'break-word' }}>
                      {log.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div style={{ marginTop: '1rem', textAlign: 'center', fontSize: '14px', color: '#64748b' }}>
          Showing {filteredLogs.length} of {parsedLogs.length} log entries
        </div>
      </div>
    </div>
  );
};

export default LogsAdmin; 