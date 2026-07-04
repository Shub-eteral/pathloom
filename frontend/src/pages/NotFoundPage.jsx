/* NotFoundPage — 404 */
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import Panel from '../components/ui/Panel';
import Button from '../components/ui/Button';
import { ThreadMark } from '../components/icons/Icons';

export default function NotFoundPage() {
  usePageTitle('Page Not Found');
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Panel className="p-12 text-center max-w-md">
        <ThreadMark className="w-12 h-12 mx-auto mb-4" style={{ color: "var(--ink-faint)", opacity: 0.4 }} />
        <h1 className="pl-display text-3xl font-bold" style={{ color: "var(--ink)" }}>404</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--ink-soft)" }}>
          This path doesn't exist yet. Let's weave you back to familiar ground.
        </p>
        <Link to="/" className="inline-block mt-6">
          <Button variant="primary" className="px-6 py-3">
            ← Back to Dashboard
          </Button>
        </Link>
      </Panel>
    </div>
  );
}
