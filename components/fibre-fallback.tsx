const nodes = [
  {x:704,y:104,kind:"home",lime:false},
  {x:742,y:325,kind:"creator",lime:true},
  {x:696,y:594,kind:"business",lime:false},
  {x:70,y:552,kind:"relay",lime:true},
  {x:62,y:120,kind:"relay",lime:false},
] as const;

export function FibreFallback({animated=true}:{animated?:boolean}) {
  return <div className={`fibre-fallback absolute inset-0 ${animated?"is-animated":""}`} aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(255,107,24,.24),transparent_24%),radial-gradient(circle_at_66%_35%,rgba(200,255,69,.08),transparent_18%)]"/>
    <svg viewBox="0 0 760 680" className="h-full w-full overflow-visible" role="presentation">
      <defs>
        <radialGradient id="core-v2" cx="50%" cy="45%"><stop offset="0" stopColor="#fff6de"/><stop offset=".24" stopColor="#ffb15f"/><stop offset=".68" stopColor="#ff6b18"/><stop offset="1" stopColor="#ff6b18" stopOpacity="0"/></radialGradient>
        <filter id="orange-glow-v2"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="lime-glow-v2"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      <g fill="none" strokeLinecap="round">
        <path className="fibre-path path-a" d="M378 337 C494 275 540 150 704 104" stroke="#ff6b18" strokeWidth="4"/>
        <path className="fibre-path path-b" d="M381 338 C525 355 610 285 742 325" stroke="#c8ff45" strokeWidth="3"/>
        <path className="fibre-path path-c" d="M380 342 C500 420 562 535 696 594" stroke="#ff6b18" strokeWidth="4"/>
        <path className="fibre-path path-d" d="M375 340 C280 450 185 505 70 552" stroke="#c8ff45" strokeWidth="3"/>
        <path className="fibre-path path-e" d="M374 336 C270 260 195 145 62 120" stroke="#ff6b18" strokeWidth="4"/>
        <path d="M378 337 C494 275 540 150 704 104" stroke="#ff6b18" strokeWidth="12" strokeOpacity=".07"/>
        <path d="M381 338 C525 355 610 285 742 325" stroke="#c8ff45" strokeWidth="10" strokeOpacity=".055"/>
        <path d="M380 342 C500 420 562 535 696 594" stroke="#ff6b18" strokeWidth="12" strokeOpacity=".07"/>
      </g>

      <g className="fallback-core-orbits" fill="none" transform="rotate(-13 378 338)">
        <ellipse cx="378" cy="338" rx="148" ry="84" stroke="#ff9a51" strokeOpacity=".48" strokeWidth="2"/>
        <ellipse cx="378" cy="338" rx="82" ry="151" stroke="#c8ff45" strokeOpacity=".2" strokeWidth="2"/>
      </g>
      <circle cx="378" cy="338" r="126" fill="#090a08" fillOpacity=".34" stroke="#ff6b18" strokeOpacity=".17"/>
      <circle cx="378" cy="338" r="96" fill="none" stroke="#ff6b18" strokeOpacity=".42"/>
      <g className="fallback-core-mesh" fill="none" stroke="#ff8a42" strokeOpacity=".78" strokeWidth="1.4">
        <path d="M378 242 452 280 470 360 410 428 330 420 286 354 304 278Z"/>
        <path d="m378 242 32 186M304 278l166 82M286 354l166-74M330 420l74-142M304 278l106 150M470 360 330 420"/>
        <path d="M378 242 286 354 410 428 470 360 304 278Z"/>
      </g>
      <circle cx="378" cy="338" r="68" fill="url(#core-v2)" filter="url(#orange-glow-v2)"/>
      <circle cx="378" cy="338" r="25" fill="#fff7e9"/>

      {nodes.map((node,index)=>{
        const color=node.lime?"#c8ff45":"#ff6b18";
        const filter=node.lime?"url(#lime-glow-v2)":"url(#orange-glow-v2)";
        return <g key={`${node.kind}-${index}`} transform={`translate(${node.x} ${node.y})`}>
          <circle r="31" fill="#090a08" stroke={color} strokeOpacity=".34"/>
          <ellipse rx="42" ry="20" fill="none" stroke={color} strokeOpacity=".62" strokeWidth="2" transform="rotate(-18)"/>
          <ellipse rx="37" ry="16" fill="none" stroke={color} strokeOpacity=".24" transform="rotate(56)"/>
          {node.kind==="home"&&<g fill="#fff6de" filter={filter}><path d="m-10 1 10-9 10 9v10H3V4h-6v7h-7Z"/></g>}
          {node.kind==="creator"&&<g filter={filter}><circle r="9" fill="none" stroke="#f6ffe0" strokeWidth="4"/><circle r="3" fill={color}/></g>}
          {node.kind==="business"&&<g fill="#fff6de" filter={filter}><rect x="-11" y="-5" width="6" height="16" rx="1"/><rect x="-3" y="-10" width="6" height="21" rx="1"/><rect x="5" y="-15" width="6" height="26" rx="1"/></g>}
          {node.kind==="relay"&&<circle r="6" fill={color} filter={filter}/>}
        </g>;
      })}

      <circle className="data-dot dot-a" cx="0" cy="0" r="7" fill="#fff7e9" filter="url(#orange-glow-v2)"/>
      <circle className="data-dot dot-b" cx="0" cy="0" r="6" fill="#c8ff45" filter="url(#lime-glow-v2)"/>
      <circle className="data-dot dot-c" cx="0" cy="0" r="7" fill="#fff7e9" filter="url(#orange-glow-v2)"/>
    </svg>
  </div>;
}
