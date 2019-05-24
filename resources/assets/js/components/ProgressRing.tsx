import React from 'react';

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

class ProgressRing extends React.Component<
  ProgressRingProps,
  ProgressRingState
> {
  public constructor(props: ProgressRingProps) {
    super(props);

    const { radius, stroke } = this.props;

    this.state = {
      normalizedRadius: radius - stroke * 2,
      circumference: (radius - stroke * 2) * (2 * Math.PI),
    };
  }

  public render(): React.ReactElement {
    const { radius, stroke, progress, strokeColor, max } = this.props;
    const { normalizedRadius, circumference } = this.state;

    let strokeDashoffset = circumference - (progress / max) * circumference;
    if (strokeDashoffset < 0) {
      strokeDashoffset = 0;
    }

    return (
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke={'#80808085'}
          fill="transparent"
          strokeWidth={stroke}
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ 'strokeDashoffset': 0 }}
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
  }
}

export default ProgressRing;
