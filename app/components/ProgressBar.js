import * as Progress from '@radix-ui/react-progress';

const ProgressBar = ({ value,color,h }) => {
  return (
    <Progress.Root className={`w-full h-${h} bg-gray-800 rounded-full overflow-hidden`}>
      <Progress.Indicator
        className={`bg-${color} h-full transition-all duration-300`}
        style={{ width: `${value}%` }}
      />
    </Progress.Root>
  );
};
export default ProgressBar;