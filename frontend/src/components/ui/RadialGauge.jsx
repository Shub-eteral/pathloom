/* RadialGauge — SVG circular progress indicator with animated draw-in */
import { useEffect, useRef, useState } from 'react';

export default function RadialGauge({
  value = 0,
  size = 120,
  strokeWidth = 8,
  label,
  tone = 'accent',
  showValue = true,
  className = '',
}) {
  const [mounted, setMounted] = useState(false);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedValue = Math.min(100, Math.max(0, value));
  const offset = circumference - (clampedValue / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const gradientId = `radial-gradient-${tone}-${size}`;

  const gradientColors = {
    accent: ['var(--accent)', 'var(--accent-2)'],
    success: ['#10B981', '#06B6D4'],
    warning: ['#F59E0B', '#F97316'],
    danger: ['#EF4444', '#F97316'],
  };

  const colors = gradientColors[tone] || gradientColors.accent;
  const fontSize = size >= 100 ? '1.5rem' : size >= 70 ? '1.1rem' : '0.85rem';

  return (
    <div className={`pl-radial-gauge ${className}`} style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors[0]} />
            <stop offset="100%" stopColor={colors[1]} />
          </linearGradient>
        </defs>
        <circle
          className="pl-radial-gauge__track"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        <circle
          className="pl-radial-gauge__fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          stroke={`url(#${gradientId})`}
          strokeDasharray={circumference}
          strokeDashoffset={mounted ? offset : circumference}
          style={{
            '--gauge-circumference': circumference,
            '--gauge-offset': offset,
            transition: mounted ? 'stroke-dashoffset 1.2s cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
        />
      </svg>
      {showValue && (
        <div className="pl-radial-gauge__center">
          <span className="pl-radial-gauge__value" style={{ fontSize }}>{clampedValue}%</span>
          {label && <span className="pl-radial-gauge__label">{label}</span>}
        </div>
      )}
    </div>
  );
}
