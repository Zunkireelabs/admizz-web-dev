interface IconProps {
  size?: number;
  className?: string;
  strokeWidth?: number;
}

const baseProps = (size: number, className: string, strokeWidth: number) => ({
  width: size,
  height: size,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className,
  "aria-hidden": "true" as const,
});

export const TrophyIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <path d="M6 4h12v3a6 6 0 0 1-12 0V4z" />
    <path d="M6 7H4a2 2 0 0 0-2 2v1a3 3 0 0 0 3 3h1" />
    <path d="M18 7h2a2 2 0 0 1 2 2v1a3 3 0 0 1-3 3h-1" />
    <path d="M12 13v4" />
    <path d="M9 21h6" />
    <path d="M10 17h4l-1 4h-2l-1-4z" />
  </svg>
);

export const FootballIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2l3 4-3 3-3-3 3-4z" fill="currentColor" opacity="0.15" />
    <path d="M3.5 9.5L7 12l-1 4-3.5-1" />
    <path d="M20.5 9.5L17 12l1 4 3.5-1" />
    <path d="M9 21l3-5 3 5" />
  </svg>
);

export const StadiumIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <ellipse cx="12" cy="12" rx="10" ry="6" />
    <ellipse cx="12" cy="12" rx="5" ry="3" />
    <path d="M2 12c0 3.3 4.5 6 10 6s10-2.7 10-6" />
  </svg>
);

export const TimerIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <circle cx="12" cy="13" r="8" />
    <path d="M12 9v4l2 2" />
    <path d="M9 2h6" />
    <path d="M12 5v2" />
  </svg>
);

export const GoalIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <rect x="3" y="6" width="18" height="14" rx="0" />
    <path d="M7 6v14M11 6v14M15 6v14M19 6v14" opacity="0.6" />
    <path d="M3 10h18M3 14h18M3 18h18" opacity="0.6" />
  </svg>
);

export const ChartIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <path d="M3 21h18" />
    <rect x="5" y="12" width="3" height="6" />
    <rect x="10" y="8" width="3" height="10" />
    <rect x="15" y="4" width="3" height="14" />
  </svg>
);

export const ArrowRightIcon = ({ size = 24, className = "", strokeWidth = 1.8 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <path d="M5 12h14" />
    <path d="M13 6l6 6-6 6" />
  </svg>
);

export const CheckIcon = ({ size = 24, className = "", strokeWidth = 2 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

export const LockIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <rect x="5" y="11" width="14" height="10" rx="2" />
    <path d="M8 11V8a4 4 0 0 1 8 0v3" />
  </svg>
);

export const PinIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <path d="M12 2C8 2 5 5 5 9c0 5 7 13 7 13s7-8 7-13c0-4-3-7-7-7z" />
    <circle cx="12" cy="9" r="2" />
  </svg>
);

export const CalendarIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <rect x="3" y="5" width="18" height="16" rx="2" />
    <path d="M8 3v4M16 3v4M3 10h18" />
  </svg>
);

export const FlameIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <path d="M12 2c1 4 5 5 5 10a5 5 0 1 1-10 0c0-3 2-4 2-7 0 0 2 1 3 4" />
  </svg>
);

export const StarIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <polygon points="12 2 15 9 22 9 17 14 18 21 12 17 6 21 7 14 2 9 9 9 12 2" />
  </svg>
);

export const PodiumIcon = ({ size = 24, className = "", strokeWidth = 1.6 }: IconProps) => (
  <svg {...baseProps(size, className, strokeWidth)}>
    <rect x="9" y="6" width="6" height="14" />
    <rect x="2" y="11" width="6" height="9" />
    <rect x="16" y="9" width="6" height="11" />
  </svg>
);
