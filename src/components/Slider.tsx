import type { ReactElement } from "react";
import { useCallback, useEffect, useRef, useState } from "react";

type Props = {
  children: ReactElement[];
};

export default function Slider({ children }: Props) {
  const contendorRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<Array<HTMLDivElement | null>>([]);
  const [handleSlider, setHandleSlider] = useState(0);

  useEffect(() => {
    if (contendorRef.current) {
      contendorRef.current.scrollLeft =
        contendorRef.current.offsetWidth * handleSlider;
    }
  }, [handleSlider]);

  const sectionObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        const index = entry.target.getAttribute("data-index");
        if (entry.isIntersecting) {
          setHandleSlider(Number(index));
        }
      });
    },
    []
  );
  useEffect(() => {
    if (!contendorRef.current) return;
    const observer = new IntersectionObserver(sectionObserver, {
      root: contendorRef.current,
      threshold: 0.5,
    });
    sectionRef.current.forEach((section) => {
      section && observer.observe(section);
    });
    return () => {
      observer.disconnect();
    };
  }, [children, sectionObserver]);

  return (
    <div className="w-screen h-screen grid grid-cols-1 grid-rows-[90%_10%]">
      <div
        ref={contendorRef}
        className="flex overflow-x-scroll hide-scroll-bar h-full snap-x snap-mandatory scroll-smooth"
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="w-full h-full overflow-y-auto flex-shrink-0"
            ref={(el) => {
              sectionRef.current[idx] = el;
            }}
            data-index={idx}
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
            checked={idx === handleSlider}
          />
        ))}
      </div>
    </div>
  );
}
