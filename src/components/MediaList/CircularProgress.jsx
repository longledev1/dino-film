const CircularProgress = ({
  percent = 0,
  size = 3,
  strokeWidth = 0.22,
  strokeColor = "#10b981",
}) => {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1200;
  const preferredSize = (size / 100) * vw;
  const finalSize = Math.max(38, Math.min(preferredSize, 48));

  const strokeWidthPx = Math.max(2.5, strokeWidth * 14);
  const radius = finalSize / 2 - strokeWidthPx;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percent / 100) * circumference;

  return (
    <div className="flex items-center justify-center rounded-full bg-[#111827] shadow-lg shadow-black/80">
      <svg width={finalSize} height={finalSize} className="block">
        {/* Nền đĩa tròn đặc che phủ nền sau */}
        <circle
          r={radius}
          cx={finalSize / 2}
          cy={finalSize / 2}
          strokeWidth={strokeWidthPx}
          stroke="rgba(255, 255, 255, 0.15)"
          fill="#111827"
        />
        {/* Vòng tiến trình màu */}
        <circle
          r={radius}
          cx={finalSize / 2}
          cy={finalSize / 2}
          strokeWidth={strokeWidthPx}
          stroke={strokeColor}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${finalSize / 2} ${finalSize / 2})`}
          strokeLinecap="round"
        />
        {/* Số % điểm số */}
        <text
          x={finalSize / 2}
          y={finalSize / 2}
          fontSize={finalSize * 0.32}
          fontWeight="bold"
          alignmentBaseline="central"
          textAnchor="middle"
          fill="white"
        >
          {percent}
        </text>
      </svg>
    </div>
  );
};

export default CircularProgress;
