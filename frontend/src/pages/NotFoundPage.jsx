/* NotFoundPage — warm 404 */
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import Panel from '../components/ui/Panel';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  usePageTitle('Page Not Found');
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Panel className="p-12 text-center max-w-md">
        <div className="text-5xl font-bold pl-display mb-4" style={{ color: 'var(--text-tertiary)' }}>404</div>
        <h1 className="pl-display text-xl" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
        <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          This path does not exist yet. Let us get you back on track.
        </p>
        <Link to="/" className="inline-block mt-6">
          <Button variant="primary" className="px-6 py-2.5">
            Back to Dashboard
          </Button>
        </Link>
      </Panel>
    </div>
  );
}
