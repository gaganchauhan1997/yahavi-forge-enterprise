interface RobotIconProps {
  size?: number
}

export function RobotIcon({ size = 40 }: RobotIconProps) {
  return (
    <svg
      viewBox="0 0 80 88"
      width={size}
      height={Math.round(size * 1.1)}
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Antenna */}
      <line x1="40" y1="2" x2="40" y2="14" stroke="#111111" strokeWidth="4" strokeLinecap="round"/>
      <circle cx="40" cy="2" r="5" fill="#FFD400" stroke="#111111" strokeWidth="2.5"/>
      {/* Head */}
      <rect x="6" y="12" width="68" height="56" rx="12" fill="#FFD400" stroke="#111111" strokeWidth="4"/>
      {/* Speech bubble tail */}
      <polygon points="18,68 6,84 36,68" fill="#FFD400" stroke="#111111" strokeWidth="3" strokeLinejoin="round"/>
      {/* Face panel */}
      <rect x="14" y="20" width="52" height="36" rx="6" fill="#111111"/>
      {/* Left eye */}
      <rect x="18" y="28" width="16" height="14" rx="3" fill="#FFD400"/>
      {/* Right eye */}
      <rect x="46" y="28" width="16" height="14" rx="3" fill="#FFD400"/>
      {/* Left ear */}
      <rect x="-2" y="26" width="10" height="18" rx="4" fill="#FF2E63" stroke="#111111" strokeWidth="3"/>
      {/* Right ear */}
      <rect x="72" y="26" width="10" height="18" rx="4" fill="#FF2E63" stroke="#111111" strokeWidth="3"/>
    </svg>
  )
}
