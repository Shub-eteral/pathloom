/* SearchInput — search field with dropdown listbox */
import { useState, useRef, useEffect } from 'react';
import { SearchIcon, CheckIcon } from '../icons/Icons';

export default function SearchInput({
  id,
  label,
  placeholder = "Search…",
  items = [],
  selectedIds = [],
  onToggle,
  searchValue,
  onSearchChange,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    const handleKey = (e) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      {label && <label htmlFor={id} className="pl-field-label mb-2">{label}</label>}
      <div className="relative">
        <SearchIcon className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--ink-faint)" }} />
        <input
          id={id}
          type="text"
          role="combobox"
          aria-expanded={isOpen}
          aria-controls={`${id}-listbox`}
          autoComplete="off"
          placeholder={placeholder}
          value={searchValue}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            onSearchChange(e.target.value);
            setIsOpen(true);
          }}
          className="pl-input py-3.5"
          style={{ paddingLeft: "2.75rem", paddingRight: "1rem" }}
        />
      </div>

      {isOpen && (
        <div id={`${id}-listbox`} role="listbox" className="pl-dropdown absolute left-0 right-0 mt-2 max-h-64 overflow-y-auto z-50 p-2">
          {items.length === 0 ? (
            <div className="text-center py-4 text-xs font-medium" style={{ color: "var(--ink-faint)" }}>
              No results found.
            </div>
          ) : (
            items.map(([itemId, itemLabel]) => {
              const isChecked = selectedIds.includes(String(itemId));
              return (
                <div
                  key={itemId}
                  role="option"
                  aria-selected={isChecked}
                  onClick={() => onToggle(itemId)}
                  className={`pl-option flex items-center justify-between px-3 py-2.5 ${isChecked ? "pl-option--selected" : ""}`}
                >
                  <div className="flex items-center gap-3">
                    <input type="checkbox" className="pl-checkbox rounded h-4 w-4 pointer-events-none" checked={isChecked} readOnly />
                    <span>{itemLabel}</span>
                  </div>
                  {isChecked && <CheckIcon className="pl-option-check w-4 h-4" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
}
