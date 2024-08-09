import { useEffect, useState } from "react";

const ProgressBar = ({
  currentValue = 0,
  maxValue
}) => {
  const [width, setWidth] = useState(0);
  const calculateWidth = () => {
    const widthPercent = ((currentValue / maxValue) * 100).toFixed(1);
    setWidth(widthPercent);
  }

  useEffect(() => {
    calculateWidth();
  }, [])

  return (
    <div className="my-2">
      <div className="w-full bg-gray-200 rounded-full">
        <div className={`bg-green-700 text-xs font-medium text-white text-center p-1 leading-none rounded-full`}
          style={{ width: `${width}%` }}>
          {width}%
        </div>
      </div>
    </div >
  )
}

export default ProgressBar;