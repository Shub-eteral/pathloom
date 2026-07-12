/* Alert — status banners using semantic colors */

export default function Alert({ variant = "teal", children, className = "" }) {
  return (
    <div className={`pl-alert pl-alert--${variant} ${className}`}>
      {children}
    </div>
  );
}
