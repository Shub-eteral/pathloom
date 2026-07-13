/* Footer — elevated with gradient accent line */
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="pl-footer">
      <div className="flex items-center justify-center gap-4 flex-wrap">
        <Link to="/" className="hover:text-[var(--text-secondary)] transition-colors">Dashboard</Link>
        <span style={{ color: 'var(--surface-4)' }}>·</span>
        <Link to="/career" className="hover:text-[var(--text-secondary)] transition-colors">Career</Link>
        <span style={{ color: 'var(--surface-4)' }}>·</span>
        <Link to="/study" className="hover:text-[var(--text-secondary)] transition-colors">Study</Link>
        <span style={{ color: 'var(--surface-4)' }}>·</span>
        <Link to="/global" className="hover:text-[var(--text-secondary)] transition-colors">Global</Link>
      </div>
      <div className="flex items-center justify-center gap-2 mt-2">
        <span className="pl-display font-semibold" style={{ fontSize: '0.72rem' }}>Pathloom</span>
        <span style={{ color: 'var(--surface-4)' }}>·</span>
        <span>From where you are to where you want to be</span>
      </div>
      <p className="mt-1" style={{ opacity: 0.5 }}>
        &copy; {new Date().getFullYear()} Pathloom. All rights reserved.
      </p>
    </footer>
  );
}
