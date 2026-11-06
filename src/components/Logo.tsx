import { Link } from 'react-router-dom'

export function Logo({ tone = 'dark' }: { tone?: 'dark' | 'light' }) {
  return (
    <Link to="/" className={`logo logo--${tone}`} aria-label="Grand Line Time">
      <svg className="logo__mark" viewBox="0 0 36 36" aria-hidden="true">
        <rect x="1.2" y="1.2" width="33.6" height="33.6" rx="8" fill="none" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 25.2h22" stroke="currentColor" strokeWidth="1.3" />
        <path d="M9.2 25.2v-3M14.2 25.2V17.8M19.4 25.2v-4.4M24.6 25.2V13.4" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" className="logo__ticks" />
        <circle cx="24.6" cy="11.6" r="2.05" className="logo__dot" />
      </svg>
      <span className="logo__words">
        <span className="logo__grand">Grand Line</span>
        <span className="logo__time">Time</span>
      </span>
    </Link>
  )
}
