import type { ReactElement } from "react";
import { useEffect, useRef, useState } from "react";

type Props = {
  children: ReactElement[];
};

export default function Slider({ children }: Props) {
  const contendorRef = useRef<HTMLDivElement>(null);
  const [handleSlider, setHandleSlider] = useState(0);

  useEffect(() => {
    if (contendorRef.current) {
      contendorRef.current.scrollLeft =
        contendorRef.current.offsetWidth * handleSlider;
    }
  }, [handleSlider]);

  return (
    <div className="w-screen h-screen grid grid-cols-1 grid-rows-[90%_10%]">
      <div
        ref={contendorRef}
        className="flex overflow-x-scroll hide-scroll-bar h-full scroll-smooth"
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="w-full h-full overflow-y-auto flex-shrink-0"
          >
            {child}
          </div>
        ))}
      </div>
      <div className="w-full flex flex-row flex-shrink-0 justify-center items-start p-2.5 gap-2 ">
        {children.map((_, idx) => (
          <input
            name="radio-section"
            type="radio"
            key={`radio-${idx}`}
            onChange={() => setHandleSlider(idx)}
            defaultChecked={idx === 0}
          />
        ))}
      </div>
    </div>
  );
}
