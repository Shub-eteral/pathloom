/* Alert — status banners with rust/teal variants */
import { AlertIcon, CheckIcon } from '../icons/Icons';

export default function Alert({ variant = "rust", children, className = "" }) {
  const Icon = variant === "teal" ? CheckIcon : AlertIcon;
  return (
    <div className={`pl-alert pl-alert--${variant} p-4 flex items-start gap-3 ${className}`}>
      <Icon className="w-5 h-5 mt-0.5 shrink-0" />
      <div className="flex-1">{children}</div>
    </div>
  );
}
