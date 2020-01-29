import React from "react";

interface ProgressRingProps {
  radius: number;
  stroke: number;
  progress: number;
  strokeColor: string;
  max: number;
}

interface ProgressRingState {
  normalizedRadius: number;
  circumference: number;
}

const ProgressRing: React.FunctionComponent<ProgressRingProps> = ({
  radius,
  stroke,
  progress,
  strokeColor,
  max,
}) => {
  const normalizedRadius: number = radius - stroke * 2;
  const circumference: number = (radius - stroke * 2) * (2 * Math.PI);
  let strokeDashoffset: number =
    circumference - (progress / max) * circumference;
  if (strokeDashoffset < 0) {
    strokeDashoffset = 0;
  }
  return (
    <svg height={radius * 2} width={radius * 2}>
      <circle
        stroke="lightgrey"
        fill="transparent"
        strokeWidth={1}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset: 0 }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
      <circle
        stroke={strokeColor}
        fill="transparent"
        strokeWidth={stroke}
        strokeDasharray={`${circumference} ${circumference}`}
        style={{ strokeDashoffset }}
        r={normalizedRadius}
        cx={radius}
        cy={radius}
      />
    </svg>
  );
};

export default ProgressRing;
