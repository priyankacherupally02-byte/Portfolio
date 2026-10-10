import styles from './BoatIllustration.module.scss'

export function BoatIllustration({ className = '' }) {
  return (
    <svg
      viewBox="0 0 260 190"
      className={`${styles.illustration} ${className}`.trim()}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* bobs gently on the water — independent of whatever GSAP is doing to
          the outer element's own transform, since this is a nested group */}
      <g className={styles.float}>
        {/* grounding shadow — the boat now sits on the shared WaveBackground strip */}
        <ellipse cx="130" cy="150" rx="90" ry="10" fill="#1a3a3d" opacity="0.18" />

        {/* hull */}
        <path
          d="M24 136 Q70 112 130 110 Q190 112 236 136 Q 190 150 130 151 Q70 150 24 136 Z"
          fill="#a6633b"
          stroke="#5c3a21"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path
          d="M38 134 Q130 120 222 134"
          fill="none"
          stroke="#8a4f2d"
          strokeWidth="2.5"
          opacity="0.7"
        />

        {/* figure */}
        <g>
          {/* legs/torso base, mostly inside the hull */}
          <path d="M118 128 Q130 112 143 128 L146 112 L114 112 Z" fill="#b5603d" />
          {/* torso */}
          <rect x="112" y="78" width="36" height="42" rx="12" fill="#b5603d" />
          {/* hair — pulled-back volume behind the head */}
          <path d="M113 62 Q110 38 130 36 Q150 38 147 62 Q149 72 141 78 Q146 64 130 60 Q114 64 119 78 Q111 72 113 62 Z" fill="#2b2420" />
          {/* head */}
          <circle cx="130" cy="63" r="14" fill="#c98b5e" />
          {/* hairline */}
          <path d="M117 56 Q130 44 143 56 Q143 50 130 48 Q117 50 117 56 Z" fill="#2b2420" />
          {/* arm (front, holding pole) */}
          <path
            d="M140 90 Q156 96 162 108"
            fill="none"
            stroke="#c98b5e"
            strokeWidth="9"
            strokeLinecap="round"
          />
          {/* arm (back) */}
          <path
            d="M122 90 Q110 98 106 110"
            fill="none"
            stroke="#c98b5e"
            strokeWidth="9"
            strokeLinecap="round"
          />
        </g>

        {/* paddle/pole — animated group, pivot near the hands */}
        <g className={styles.paddle} style={{ transformOrigin: '160px 100px' }}>
          <line x1="160" y1="100" x2="186" y2="178" stroke="#6b4a30" strokeWidth="5" strokeLinecap="round" />
          <line x1="160" y1="100" x2="140" y2="40" stroke="#6b4a30" strokeWidth="5" strokeLinecap="round" />
        </g>
      </g>
    </svg>
  )
}
