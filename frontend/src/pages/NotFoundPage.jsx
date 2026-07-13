/* NotFoundPage — animated 404 with floating shapes */
import { Link } from 'react-router-dom';
import usePageTitle from '../hooks/usePageTitle';
import Panel from '../components/ui/Panel';
import Button from '../components/ui/Button';

export default function NotFoundPage() {
  usePageTitle('Page Not Found');
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Panel className="p-12 text-center max-w-md relative overflow-hidden">
        {/* Floating decorative shapes */}
        <div className="pl-empty-shapes">
          <div className="pl-empty-shape" />
          <div className="pl-empty-shape" />
          <div className="pl-empty-shape" />
        </div>

        <div className="relative z-10">
          <div className="pl-display text-6xl font-bold mb-3" style={{
            background: 'var(--accent-gradient)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            404
          </div>
          <h1 className="pl-display text-xl" style={{ color: 'var(--text-primary)' }}>Page not found</h1>
          <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
            This path does not exist yet. Let us get you back on track.
          </p>
          <Link to="/" className="inline-block mt-6">
            <Button variant="primary" className="px-6 py-2.5">
              Back to Dashboard
            </Button>
          </Link>
        </div>
      </Panel>
    </div>
  );
}
