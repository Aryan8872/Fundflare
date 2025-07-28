import React, { useEffect, useState } from 'react';

export default function UserLogs() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const res = await fetch('http://localhost:5000/api/logs', { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch logs');
        const data = await res.json();
        setLogs(data.logs || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchLogs();
  }, []);

  if (loading) return <div className="py-8 text-center">Loading logs...</div>;
  if (error) return <div className="py-8 text-center text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mt-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">User Activity Logs</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Email</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Username</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">URL</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Method</th>
              <th className="text-left py-3 px-4 font-semibold text-gray-900">Time</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3 px-4">{log.email}</td>
                <td className="py-3 px-4">{log.username || '-'}</td>
                <td className="py-3 px-4">{log.url}</td>
                <td className="py-3 px-4">{log.method}</td>
                <td className="py-3 px-4">{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
