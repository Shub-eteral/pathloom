/* EmptyState — placeholder when no data/results */
import { ThreadMark } from '../icons/Icons';

export default function EmptyState({ title, body }) {
  return (
    <div className="pl-empty text-center py-14 px-8">
      <ThreadMark className="pl-empty-icon w-9 h-9 mx-auto mb-4" />
      <h4 className="pl-empty-title">{title}</h4>
      <p className="pl-empty-body mt-1.5 max-w-sm mx-auto">{body}</p>
    </div>
  );
}
