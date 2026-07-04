/* Footer — version info and copyright */

export default function Footer() {
  return (
    <footer className="pl-footer">
      <div className="flex items-center justify-center gap-2">
        <span className="pl-display font-semibold">Pathloom</span>
        <span className="pl-mono">v2.1</span>
        <span>·</span>
        <span>From where you are → to where you want to be</span>
      </div>
      <p className="mt-1 opacity-60">© {new Date().getFullYear()} Pathloom. All rights reserved.</p>
    </footer>
  );
}
