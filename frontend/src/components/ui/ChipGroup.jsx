/* ChipGroup — skill/tag chips with remove functionality */
import { CloseIcon } from '../icons/Icons';

export default function ChipGroup({ items, labels = {}, onRemove, emptyText = "No items selected" }) {
  if (items.length === 0) {
    return <span className="pl-chip-empty">{emptyText}</span>;
  }
  return (
    <div className="flex flex-wrap gap-1.5 min-h-6">
      {items.map((id) => (
        <span key={id} className="pl-chip py-1" style={{ paddingLeft: "0.75rem", paddingRight: "0.4rem" }}>
          {labels[id] ?? id}
          {onRemove && (
            <button onClick={() => onRemove(id)} aria-label={`Remove ${labels[id] ?? id}`} className="pl-chip-remove p-0.5">
              <CloseIcon className="w-3.5 h-3.5" />
            </button>
          )}
        </span>
      ))}
    </div>
  );
}
