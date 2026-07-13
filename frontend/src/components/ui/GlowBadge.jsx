/* GlowBadge — animated status badge with soft glow pulse */

const toneMap = {
  success: 'pl-glow-badge--success',
  warning: 'pl-glow-badge--warning',
  danger: 'pl-glow-badge--danger',
  accent: 'pl-glow-badge--accent',
  SAFE: 'pl-glow-badge--success',
  TARGET: 'pl-glow-badge--warning',
  REACH: 'pl-glow-badge--danger',
  HIGH: 'pl-glow-badge--success',
  MEDIUM: 'pl-glow-badge--warning',
  LOW: 'pl-glow-badge--danger',
};

export default function GlowBadge({ children, tone = 'accent', className = '' }) {
  const cls = toneMap[tone] || 'pl-glow-badge--accent';
  return (
    <span className={`pl-glow-badge ${cls} ${className}`}>
      {children}
    </span>
  );
}
