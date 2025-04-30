
interface RatingCircleProps {
  rating: number;
  maxRating?: number;
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const RatingCircle = ({
  rating,
  maxRating = 10,
  size = 'md',
  color = '#FFCE31'
}: RatingCircleProps) => {
  // Calculate percentage
  const percentage = (rating / maxRating) * 100;
  
  // Size configs
  const sizeConfig = {
    sm: { width: 32, strokeWidth: 3 },
    md: { width: 40, strokeWidth: 4 },
    lg: { width: 60, strokeWidth: 5 }
  };
  
  const { width, strokeWidth } = sizeConfig[size];
  const radius = (width / 2) - (strokeWidth * 2);
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;
  
  // Font size based on circle size
  const fontSize = size === 'sm' ? 'text-xs' : size === 'md' ? 'text-sm' : 'text-base';
  
  return (
    <div className="relative flex items-center justify-center" style={{ width, height: width }}>
      <svg width={width} height={width} viewBox={`0 0 ${width} ${width}`} className="rotate-[-90deg]">
        {/* Background circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="transparent"
          stroke="#2D1B4E"
          strokeWidth={strokeWidth}
        />
        
        {/* Progress circle */}
        <circle
          cx={width / 2}
          cy={width / 2}
          r={radius}
          fill="transparent"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </svg>
      
      {/* Rating text */}
      <div className={`absolute ${fontSize} font-bold`}>
        {rating}
      </div>
    </div>
  );
};

export default RatingCircle;
