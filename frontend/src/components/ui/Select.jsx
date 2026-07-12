/* Select — styled dropdown with chevron icon */
import { ChevronIcon } from '../icons/Icons';

export default function Select({ id, label, value, onChange, options, placeholder = "Select…", className = "", ...rest }) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && <label htmlFor={id} className="pl-field-label">{label}</label>}
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="pl-select px-4 py-3.5"
          {...rest}
        >
          <option value="">{placeholder}</option>
          {options.map((opt) => {
            const optValue = typeof opt === "object" ? opt.value : opt;
            const optLabel = typeof opt === "object" ? opt.label : opt;
            return (
              <option key={optValue} value={optValue}>{optLabel}</option>
            );
          })}
        </select>
        <ChevronIcon className="w-4 h-4 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color: "var(--text-tertiary)" }} />
      </div>
    </div>
  );
}
