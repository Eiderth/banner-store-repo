import { useState, useEffect } from "react";

export default function useIsMobile(width = 768) {
  const [isMobile, setIsMobile] = useState(() => {
    // Inicialización síncrona para evitar el parpadeo
    if (typeof window !== "undefined") {
      return window.matchMedia(`(max-width: ${width}px)`).matches;
    }
    return false;
  });

  useEffect(() => {
    const media = window.matchMedia(`(max-width: ${width}px)`);
    // Listener para cambios de tamaño de la ventana
    const listener = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    // Asegurarse de que el estado es correcto en el cliente
    setIsMobile(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [width]);

  return isMobile;
}
