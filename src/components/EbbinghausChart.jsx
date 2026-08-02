import React, { useState } from 'react';

const LEGEND_ITEMS = [
  { label: 'Initial Study', color: '#3b82f6', day: 'Day 0' },
  { label: '1st Review', color: '#22c55e', day: 'Day 1' },
  { label: '2nd Review', color: '#eab308', day: 'Day 3' },
  { label: '3rd Review', color: '#f43f5e', day: 'Day 7' },
  { label: '4th Review', color: '#a855f7', day: 'Day 14' },
  { label: '5th Review', color: '#f97316', day: 'Day 25' }
];

const RETENTION_DATA = ['4.2%', '12.5%', '26.8%', '56.4%', '81.9%', '96.9%'];

const CURVES = [
  { d: 'M 60 40 C 90 220, 150 310, 740 327', cx: 740, cy: 327, color: '#3b82f6' },
  { d: 'M 82.7 40 C 130 200, 220 290, 740 302', cx: 740, cy: 302, color: '#22c55e' },
  { d: 'M 128 40 C 200 180, 320 250, 740 260', cx: 128, cy: 40, endCx: 740, endCy: 260, color: '#eab308' },
  { d: 'M 218.7 40 C 320 140, 480 160, 740 171', cx: 218.7, cy: 40, endCx: 740, endCy: 171, color: '#f43f5e' },
  { d: 'M 377.3 40 C 480 80, 600 90, 740 94', cx: 377.3, cy: 40, endCx: 740, endCy: 94, color: '#a855f7' },
  { d: 'M 626.7 40 C 660 45, 700 48, 740 49', cx: 626.7, cy: 40, endCx: 740, endCy: 49, color: '#f97316' }
];

export default function EbbinghausChart() {
  const [sessionCount, setSessionCount] = useState(5);

  return (
    <div className="my-8 rounded-xl border border-[#1f222e] bg-[#12131a] p-4 md:p-6 text-slate-100 shadow-2xl font-sans">
      {/* Header & Retention Display */}
      <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-[#1f222e] pb-4">
        <div>
          <h3 className="text-xl font-bold tracking-tight text-white m-0">
            Ebbinghaus Forgetting Curve
          </h3>
          <p className="text-xs text-slate-400 m-0 mt-1">
            Impact of spaced repetition review sessions over a 30-day period
          </p>
        </div>
        <div className="flex items-center gap-3 bg-[#191c28] px-4 py-2 rounded-lg border border-[#2a2e40] self-start sm:self-auto">
          <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">
            Retention at 30 Days:
          </span>
          <span className="text-2xl font-extrabold text-emerald-400 transition-all duration-300">
            {RETENTION_DATA[sessionCount]}
          </span>
        </div>
      </div>

      {/* Legend */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
        {LEGEND_ITEMS.map((item, index) => {
          const isActive = index <= sessionCount;
          return (
            <div
              key={index}
              className={`flex items-center gap-2 rounded-md p-2 transition-all duration-300 border ${
                isActive
                  ? 'border-[#2e344a] bg-[#1a1d2b] text-slate-200'
                  : 'border-transparent bg-transparent opacity-25 text-slate-500'
              }`}
            >
              <span
                className="h-3 w-3 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <div className="flex flex-col text-xs leading-tight">
                <span className="font-medium">{item.label}</span>
                <span className="text-[10px] text-slate-400">{item.day}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* SVG Chart Box */}
      <div className="relative w-full overflow-hidden rounded-lg bg-[#0d0e14] p-2 border border-[#1a1c27]">
        <svg
          viewBox="0 0 800 420"
          className="w-full h-auto overflow-visible select-none"
        >
          <defs>
            <linearGradient id="grid-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#1f222e" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#1f222e" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Grid Lines & Y-Axis Labels */}
          {[
            { y: 40, label: '100%' },
            { y: 100, label: '80%' },
            { y: 160, label: '60%' },
            { y: 220, label: '40%' },
            { y: 280, label: '20%' },
            { y: 340, label: '0%' }
          ].map((grid, i) => (
            <g key={i}>
              <line
                x1="60"
                y1={grid.y}
                x2="740"
                y2={grid.y}
                stroke="#1f2436"
                strokeWidth="1"
              />
              <text
                x="50"
                y={grid.y + 4}
                fill="#64748b"
                fontSize="12"
                textAnchor="end"
                fontFamily="monospace"
              >
                {grid.label}
              </text>
            </g>
          ))}

          {/* Recall Threshold Line (y = 160) */}
          <line
            x1="60"
            y1="160"
            x2="740"
            y2="160"
            stroke="#3b82f6"
            strokeWidth="1.5"
            strokeDasharray="4 4"
            opacity="0.8"
          />
          <text
            x="735"
            y="152"
            fill="#3b82f6"
            fontSize="11"
            textAnchor="end"
            fontWeight="bold"
            letterSpacing="0.5"
          >
            RECALL THRESHOLD (60%)
          </text>

          {/* X-Axis Labels (Days) */}
          {[
            { x: 60, label: 'Day 0' },
            { x: 173, label: 'Day 5' },
            { x: 286, label: 'Day 10' },
            { x: 400, label: 'Day 15' },
            { x: 513, label: 'Day 20' },
            { x: 626, label: 'Day 25' },
            { x: 740, label: 'Day 30' }
          ].map((tick, i) => (
            <g key={i}>
              <line
                x1={tick.x}
                y1="340"
                x2={tick.x}
                y2="346"
                stroke="#334155"
                strokeWidth="1"
              />
              <text
                x={tick.x}
                y="368"
                fill="#64748b"
                fontSize="12"
                textAnchor="middle"
                fontFamily="sans-serif"
              >
                {tick.label}
              </text>
            </g>
          ))}

          {/* Curves & End Dots */}
          {CURVES.map((curve, index) => {
            const isActive = index <= sessionCount;
            const endCx = curve.endCx || curve.cx;
            const endCy = curve.endCy || curve.cy;
            return (
              <g
                key={index}
                className="transition-opacity duration-500"
                style={{ opacity: isActive ? 1 : 0 }}
              >
                <path
                  d={curve.d}
                  fill="none"
                  stroke={curve.color}
                  strokeWidth={index === sessionCount ? '3.5' : '2.5'}
                  strokeLinecap="round"
                />
                <circle
                  cx={endCx}
                  cy={endCy}
                  r={index === sessionCount ? '6' : '4'}
                  fill={curve.color}
                  stroke="#12131a"
                  strokeWidth="2"
                />
              </g>
            );
          })}
        </svg>
      </div>

      {/* Slider Control */}
      <div className="mt-6 flex flex-col gap-2 bg-[#171924] p-4 rounded-lg border border-[#232738]">
        <div className="flex justify-between items-center text-sm font-medium text-slate-300">
          <label htmlFor="review-slider" className="cursor-pointer flex items-center gap-2">
            <span>Review Sessions Completed:</span>
            <span className="text-emerald-400 font-bold text-base px-2 py-0.5 rounded bg-[#202538] border border-[#2e3650]">
              {sessionCount} / 5
            </span>
          </label>
          <span className="text-xs text-slate-400">Drag slider to test retention</span>
        </div>
        <input
          id="review-slider"
          type="range"
          min="0"
          max="5"
          step="1"
          value={sessionCount}
          onChange={(e) => setSessionCount(parseInt(e.target.value, 10))}
          className="w-full h-2.5 bg-[#262b3d] rounded-lg appearance-none cursor-pointer accent-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
        />
      </div>
    </div>
  );
}
