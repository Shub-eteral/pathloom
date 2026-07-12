/* Footer — minimal warm footer */

export default function Footer() {
  return (
    <footer className="pl-footer">
      <div className="flex items-center justify-center gap-2">
        <span className="pl-display font-semibold" style={{ fontSize: '0.72rem' }}>Pathloom</span>
        <span style={{ color: 'var(--text-tertiary)' }}>·</span>
        <span>From where you are to where you want to be</span>
      </div>
      <p className="mt-1" style={{ opacity: 0.5 }}>
        &copy; {new Date().getFullYear()} Pathloom. All rights reserved.
      </p>
    </footer>
  );
}
