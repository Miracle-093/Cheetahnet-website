export function FibreFallback({ animated = true }: { animated?: boolean }) {
  return <div className={`fibre-fallback absolute inset-0 ${animated ? "is-animated" : ""}`} aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(255,107,24,.24),transparent_24%),radial-gradient(circle_at_66%_35%,rgba(200,255,69,.08),transparent_18%)]" />
    <svg viewBox="0 0 760 680" className="h-full w-full overflow-visible" role="presentation">
      <defs>
        <radialGradient id="core" cx="50%" cy="45%">
          <stop offset="0" stopColor="#fff6de"/><stop offset=".24" stopColor="#ffb15f"/><stop offset=".68" stopColor="#ff6b18"/><stop offset="1" stopColor="#ff6b18" stopOpacity="0"/>
        </radialGradient>
        <filter id="orangeGlow"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="limeGlow"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <g fill="none" strokeLinecap="round">
        <path className="fibre-path path-a" d="M378 337 C500 284 542 130 716 92" stroke="#ff6b18" strokeWidth="3"/>
        <path className="fibre-path path-b" d="M381 338 C532 355 610 284 752 320" stroke="#c8ff45" strokeWidth="2"/>
        <path className="fibre-path path-c" d="M380 342 C505 415 567 545 726 604" stroke="#ff6b18" strokeWidth="3"/>
        <path className="fibre-path path-d" d="M375 340 C282 456 187 507 60 555" stroke="#c8ff45" strokeWidth="2"/>
        <path className="fibre-path path-e" d="M374 336 C273 260 197 140 49 112" stroke="#ff6b18" strokeWidth="3"/>
        <path d="M378 337 C454 210 581 212 716 92" stroke="#ffb070" strokeOpacity=".18"/>
        <path d="M378 337 C451 487 596 476 726 604" stroke="#ffb070" strokeOpacity=".18"/>
      </g>
      <circle cx="378" cy="338" r="125" fill="none" stroke="#ff6b18" strokeOpacity=".15"/>
      <circle cx="378" cy="338" r="91" fill="none" stroke="#ff6b18" strokeOpacity=".32"/>
      <circle cx="378" cy="338" r="66" fill="url(#core)" filter="url(#orangeGlow)"/>
      <circle cx="378" cy="338" r="22" fill="#fff7e9"/>
      {[[716,92,"HOME"],[752,320,"CREATE"],[726,604,"BUSINESS"],[60,555,"WORK"],[49,112,"PLAY"]].map(([x,y,label], index) => <g key={String(label)}>
        <circle cx={Number(x)} cy={Number(y)} r="22" fill="#090a08" stroke={index % 2 ? "#c8ff45" : "#ff6b18"} strokeWidth="2" filter={index % 2 ? "url(#limeGlow)" : "url(#orangeGlow)"}/>
        <circle cx={Number(x)} cy={Number(y)} r="5" fill={index % 2 ? "#c8ff45" : "#ff6b18"}/>
        <text x={Number(x)} y={Number(y)+42} textAnchor="middle" fill="#f4f0e5" fillOpacity=".55" fontSize="10" letterSpacing="2">{String(label)}</text>
      </g>)}
      <circle className="data-dot dot-a" cx="0" cy="0" r="6" fill="#fff7e9" filter="url(#orangeGlow)"/>
      <circle className="data-dot dot-b" cx="0" cy="0" r="5" fill="#c8ff45" filter="url(#limeGlow)"/>
      <circle className="data-dot dot-c" cx="0" cy="0" r="6" fill="#ff8e4d" filter="url(#orangeGlow)"/>
    </svg>
  </div>;
}
