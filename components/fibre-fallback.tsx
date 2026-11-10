const nodes = [
  {x:704,y:104,kind:"home",lime:false},
  {x:742,y:325,kind:"creator",lime:true},
  {x:696,y:594,kind:"business",lime:false},
  {x:70,y:552,kind:"relay",lime:true},
  {x:62,y:120,kind:"relay",lime:false},
] as const;

export function FibreFallback({animated=true}:{animated?:boolean}) {
  return <div className={`fibre-fallback absolute inset-0 ${animated?"is-animated":""}`} aria-hidden="true">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_52%_48%,rgba(255,178,0,.24),transparent_24%),radial-gradient(circle_at_66%_35%,rgba(255,227,161,.08),transparent_18%)]"/>
    <svg viewBox="0 0 760 680" className="h-full w-full overflow-visible" role="presentation">
      <defs>
        <radialGradient id="core-v2" cx="50%" cy="45%"><stop offset="0" stopColor="#fff6de"/><stop offset=".24" stopColor="#ffd36e"/><stop offset=".68" stopColor="#ffb200"/><stop offset="1" stopColor="#ffb200" stopOpacity="0"/></radialGradient>
        <linearGradient id="pod-metal" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#3b321f"/><stop offset=".42" stopColor="#12110e"/><stop offset="1" stopColor="#2a2112"/></linearGradient>
        <linearGradient id="pod-glass" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#fff4d6" stopOpacity=".28"/><stop offset="1" stopColor="#ffb200" stopOpacity=".04"/></linearGradient>
        <filter id="orange-glow-v2"><feGaussianBlur stdDeviation="8" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
        <filter id="lime-glow-v2"><feGaussianBlur stdDeviation="5" result="blur"/><feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>

      <g fill="none" strokeLinecap="round">
        <path className="fibre-path path-a" d="M378 337 C494 275 540 150 704 104" stroke="#ffb200" strokeWidth="4"/>
        <path className="fibre-path path-b" d="M381 338 C525 355 610 285 742 325" stroke="#ffe3a1" strokeWidth="3"/>
        <path className="fibre-path path-c" d="M380 342 C500 420 562 535 696 594" stroke="#ffb200" strokeWidth="4"/>
        <path className="fibre-path path-d fallback-secondary" d="M375 340 C280 450 185 505 70 552" stroke="#ffe3a1" strokeWidth="3"/>
        <path className="fibre-path path-e fallback-secondary" d="M374 336 C270 260 195 145 62 120" stroke="#ffb200" strokeWidth="4"/>
        <path d="M378 337 C494 275 540 150 704 104" stroke="#ffb200" strokeWidth="12" strokeOpacity=".07"/>
        <path d="M381 338 C525 355 610 285 742 325" stroke="#ffe3a1" strokeWidth="10" strokeOpacity=".055"/>
        <path d="M380 342 C500 420 562 535 696 594" stroke="#ffb200" strokeWidth="12" strokeOpacity=".07"/>
      </g>

      <g className="fallback-core-orbits" fill="none" transform="rotate(-13 378 338)">
        <ellipse cx="378" cy="338" rx="148" ry="84" stroke="#ffcf5a" strokeOpacity=".48" strokeWidth="2"/>
        <ellipse cx="378" cy="338" rx="82" ry="151" stroke="#ffe3a1" strokeOpacity=".2" strokeWidth="2"/>
      </g>
      <circle cx="378" cy="338" r="126" fill="#090a08" fillOpacity=".34" stroke="#ffb200" strokeOpacity=".17"/>
      <circle cx="378" cy="338" r="96" fill="none" stroke="#ffb200" strokeOpacity=".42"/>
      <g className="fallback-core-mesh" fill="none" stroke="#ffc233" strokeOpacity=".78" strokeWidth="1.4">
        <path d="M378 242 452 280 470 360 410 428 330 420 286 354 304 278Z"/>
        <path d="m378 242 32 186M304 278l166 82M286 354l166-74M330 420l74-142M304 278l106 150M470 360 330 420"/>
        <path d="M378 242 286 354 410 428 470 360 304 278Z"/>
      </g>
      <circle cx="378" cy="338" r="68" fill="url(#core-v2)" filter="url(#orange-glow-v2)"/>
      <circle cx="378" cy="338" r="25" fill="#fff7e9"/>

      {nodes.map((node,index)=>{
        const color=node.lime?"#ffe3a1":"#ffb200";
        const filter=node.lime?"url(#lime-glow-v2)":"url(#orange-glow-v2)";
        return <g key={`${node.kind}-${index}`} className={node.kind==="relay"?"fallback-secondary":"fallback-primary"} transform={`translate(${node.x} ${node.y})`}>
          {node.kind!=="relay"&&<g>
            <ellipse cy="18" rx="43" ry="17" fill="#070705" opacity=".65"/>
            <path d="M-39 5 Q0 23 39 5 L35 19 Q0 36-35 19Z" fill="url(#pod-metal)" stroke={color} strokeOpacity=".55"/>
            <ellipse cy="5" rx="39" ry="17" fill="url(#pod-metal)" stroke={color} strokeWidth="1.5"/>
            <path d="M-31 3 Q0-44 31 3" fill="url(#pod-glass)" stroke="#fff4d6" strokeOpacity=".2"/>
          </g>}
          {node.kind==="relay"&&<><circle r="25" fill="#090a08" stroke={color} strokeOpacity=".34"/><ellipse rx="34" ry="15" fill="none" stroke={color} strokeOpacity=".5" transform="rotate(-18)"/><circle r="6" fill={color} filter={filter}/></>}
          {node.kind==="home"&&<g transform="translate(0 -3) scale(1.18)" fill="url(#pod-metal)" stroke="#ffe3a1" strokeWidth="1"><path d="m-13 0 13-12L13 0v14H4V5h-8v9h-9Z"/><rect x="5" y="2" width="5" height="5" fill={color} stroke="none" filter={filter}/></g>}
          {node.kind==="creator"&&<g transform="translate(0 -3)" filter={filter}><rect x="-15" y="-10" width="23" height="17" rx="3" fill="url(#pod-metal)" stroke="#fff6dc"/><circle cx="-3" cy="-2" r="5" fill="none" stroke={color} strokeWidth="2"/><path d="M12-8v19M9 11h7" stroke="#fff6dc" strokeWidth="3" strokeLinecap="round"/></g>}
          {node.kind==="business"&&<g transform="translate(0 -5)" fill="url(#pod-metal)" stroke="#ffe3a1"><rect x="-16" y="-6" width="9" height="22" rx="2"/><rect x="-4" y="-14" width="9" height="30" rx="2"/><rect x="8" y="-2" width="9" height="18" rx="2"/><path d="M-13 0h3M-1-7h3M11 4h3" stroke={color} strokeWidth="2" filter={filter}/></g>}
        </g>;
      })}

      <circle className="data-dot dot-a" cx="0" cy="0" r="7" fill="#fff7e9" filter="url(#orange-glow-v2)"/>
      <circle className="data-dot dot-b" cx="0" cy="0" r="6" fill="#ffe3a1" filter="url(#lime-glow-v2)"/>
      <circle className="data-dot dot-c" cx="0" cy="0" r="7" fill="#fff7e9" filter="url(#orange-glow-v2)"/>
    </svg>
  </div>;
}
