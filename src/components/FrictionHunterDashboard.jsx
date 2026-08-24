import React, { useState, useEffect } from "react";

export default function FrictionHunterDashboard() {
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(
      "https://friction-hunter-dashboard-5r2l4cyana-uc.a.run.app/api/public/opportunities"
    )
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch pipeline data");
        return res.json();
      })
      .then(data => {
        setOpportunities(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Friction Hunter API error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="my-8 rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#1e2129] p-8 text-center shadow-lg">
        <div className="mb-3 inline-block h-8 w-8 animate-spin rounded-full border-t-2 border-b-2 border-[#a47bea]"></div>
        <p className="m-0 font-mono text-sm text-[#9ba0ad]">
          Connecting to Cloud Run Telemetry Engine...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="my-8 rounded-xl border border-red-900/40 bg-[#1e2129] p-6 text-center shadow-lg">
        <p className="m-0 font-mono text-sm text-red-400">
          ⚠️ Telemetry Offline: {error}
        </p>
      </div>
    );
  }

  const totalTap = opportunities.reduce(
    (acc, curr) => acc + (curr.tap_score || curr.tap_value || 0),
    0
  );

  return (
    <div className="my-8 rounded-xl border border-[rgba(230,235,245,0.12)] bg-[#1e2129] p-6 font-sans text-[#dce0e8] shadow-lg">
      <div className="mb-6 flex flex-col items-start justify-between gap-4 border-b border-[rgba(230,235,245,0.10)] pb-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a47bea] opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#a47bea]"></span>
            </span>
            <h3 className="m-0 text-lg font-bold tracking-tight text-white sm:text-xl">
              Live Pipeline Telemetry
            </h3>
          </div>
          <p className="mt-1 mb-0 font-mono text-xs text-[#9ba0ad]">
            SYSTEM ACTIVE &bull; Serving {opportunities.length} validated
            friction targets
          </p>
        </div>
        <div className="rounded-lg border border-[rgba(230,235,245,0.12)] bg-[#242831] px-4 py-2">
          <span className="block font-mono text-xs text-[#9ba0ad]">
            TOTAL ADDRESSABLE PAIN
          </span>
          <span className="font-mono text-lg font-bold text-white">
            $
            {totalTap.toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </span>
        </div>
      </div>

      <div className="custom-scrollbar max-h-[520px] space-y-3 overflow-y-auto pr-2">
        {opportunities.map((opp, idx) => (
          <div
            key={opp.job_id || idx}
            className="rounded-lg border border-[rgba(230,235,245,0.10)] bg-[#242831] p-4 transition-all duration-150 hover:border-[rgba(230,235,245,0.2)]"
          >
            <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
              <div>
                <h4 className="m-0 text-base font-bold tracking-tight text-white">
                  {opp.title}
                </h4>
                <p className="mt-1 mb-0 flex flex-wrap items-center gap-2 text-xs text-[#9ba0ad]">
                  <span>🏢 {opp.company}</span>
                  <span>&bull;</span>
                  <span>📍 {opp.location || "Remote/US"}</span>
                  <span>&bull;</span>
                  <span className="font-mono font-semibold text-[#a47bea]">
                    TAP: $
                    {Number(
                      opp.tap_score || opp.tap_value || 0
                    ).toLocaleString()}
                  </span>
                </p>
              </div>
              {opp.job_url && (
                <a
                  href={opp.job_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex shrink-0 items-center gap-1.5 rounded-md border border-[rgba(230,235,245,0.15)] bg-[#282c35] px-3 py-1.5 text-xs font-semibold text-white no-underline transition-colors hover:bg-[#343a46]"
                >
                  <span>🔗 View Job</span>
                  <span className="text-[10px]">↗</span>
                </a>
              )}
            </div>

            <div className="mt-3 rounded-md border border-[rgba(230,235,245,0.08)] bg-[#1e2129] p-3">
              <div className="mb-1 font-mono text-[11px] font-semibold tracking-wider text-[#a47bea] uppercase">
                💡 Isolated Software Axiom
              </div>
              <p className="m-0 font-mono text-xs leading-relaxed text-[#dce0e8] italic">
                "{opp.axiom || opp.isolated_axiom}"
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
