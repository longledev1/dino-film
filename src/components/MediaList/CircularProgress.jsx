const CircularProgress = ({
  percent = 12,
  size = 3,
  strokeWidth = 0.25,
  strokeColor = "green",
}) => {
  // Chuyển size sang px bằng cách clamp trong JS
  // min: 40px, max: 80px, còn lại theo % viewport
  const vw = window.innerWidth;
  const preferredSize = (size / 100) * vw; // size là theo vw
  const finalSize = Math.max(40, Math.min(preferredSize, 80)); // clamp trong JS

  const radius = finalSize / 2 - strokeWidth * 16;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference - (percent / 100) * circumference;

  return (
    <div>
      <svg width={finalSize} height={finalSize}>
        {/* Background circle */}
        <circle
          r={radius}
          cx={finalSize / 2}
          cy={finalSize / 2}
          strokeWidth={strokeWidth * 16}
          stroke="white"
          fill="none"
        />
        {/* Progress circle */}
        <circle
          r={radius}
          cx={finalSize / 2}
          cy={finalSize / 2}
          strokeWidth={strokeWidth * 16}
          stroke={strokeColor}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          transform={`rotate(-90 ${finalSize / 2} ${finalSize / 2})`}
          strokeLinecap="round"
        />
        {/* Text ở giữa */}
        <text
          x={finalSize / 2}
          y={finalSize / 2}
          fontSize={finalSize * 0.3} // khoảng 25% kích thước SVG
          alignmentBaseline="middle"
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
