/* Button — gradient primary, glass, ghost, outline with ripple effect */

export default function Button({ variant = 'primary', children, className = '', ...rest }) {
  return (
    <button className={`pl-btn pl-btn--${variant} ${className}`} {...rest}>
      {children}
    </button>
  );
}

export function Spinner() {
  return <div className="pl-spinner" />;
}
