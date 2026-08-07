import React, { useState, useEffect } from 'react';

export default function FrictionHunterDashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch directly from live Cloud Run public endpoint
    fetch('https://friction-hunter-dashboard-5r2l4cyana-uc.a.run.app/api/public/opportunities')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch pipeline data');
        return res.json();
      })
      .then((data) => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Friction Hunter API error:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="bg-gray-900 rounded-xl p-8 my-8 border border-gray-800 text-center shadow-2xl">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-3"></div>
        <p className="text-sm font-mono text-gray-400 m-0">Connecting to Cloud Run Telemetry Engine...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-gray-900 rounded-xl p-6 my-8 border border-red-900/50 text-center shadow-2xl">
        <p className="text-red-400 font-mono text-sm m-0">⚠️ Telemetry Offline: {error}</p>
      </div>
    );
  }

  const totalTap = opportunities.reduce((acc, curr) => acc + (curr.tap_score || curr.tap_value || 0), 0);

  return (
    <div className="bg-gray-950 rounded-xl p-6 shadow-2xl my-8 border border-gray-800 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <h3 className="text-xl font-bold text-white m-0 tracking-tight">Live Pipeline Telemetry</h3>
          </div>
          <p className="text-xs font-mono text-emerald-400 mt-1 mb-0">
            SYSTEM ACTIVE &bull; Serving {opportunities.length} validated friction targets
          </p>
        </div>
        <div className="bg-gray-900 px-4 py-2 rounded-lg border border-gray-800">
          <span className="text-xs text-gray-400 block font-mono">TOTAL ADDRESSABLE PAIN</span>
          <span className="text-lg font-extrabold text-emerald-400 font-mono">
            ${totalTap.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      <div className="overflow-y-auto max-h-[520px] pr-2 space-y-4 custom-scrollbar">
        {opportunities.map((opp, idx) => (
          <div
            key={opp.job_id || idx}
            className="bg-gray-900/80 p-4 rounded-lg border border-gray-800 hover:border-blue-500/50 transition-all duration-200 hover:bg-gray-900"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
              <div>
                <h4 className="text-base font-bold text-white m-0 tracking-tight">{opp.title}</h4>
                <p className="text-xs text-gray-400 mt-1 mb-0 flex items-center gap-2 flex-wrap">
                  <span>🏢 {opp.company}</span>
                  <span>&bull;</span>
                  <span>📍 {opp.location || 'Remote/US'}</span>
                  <span>&bull;</span>
                  <span className="text-emerald-400 font-mono font-semibold">
                    TAP: ${Number(opp.tap_score || opp.tap_value || 0).toLocaleString()}
                  </span>
                </p>
              </div>
              {opp.job_url && (
                <a
                  href={opp.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-blue-600/90 hover:bg-blue-500 text-white text-xs font-semibold py-1.5 px-3 rounded-md transition-colors no-underline inline-flex items-center gap-1.5 shrink-0"
                >
                  <span>🔗 View Job</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}
            </div>

            <div className="mt-3 bg-gray-950 p-3 rounded-md border border-gray-800/80">
              <div className="text-[11px] font-mono text-purple-400 font-semibold mb-1 uppercase tracking-wider">
                💡 Isolated Software Axiom
              </div>
              <p className="text-xs text-gray-300 font-mono m-0 leading-relaxed italic">
                "{opp.axiom || opp.isolated_axiom}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
