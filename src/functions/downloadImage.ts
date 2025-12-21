import type { RefObject } from "react";
import html2canvas from "html2canvas-pro";
import downloadjs from "downloadjs";
const downloadImage = (
  ref: RefObject<HTMLElement | null>,
  final: () => void
) => {
  setTimeout(async () => {
    if (!ref.current) return;
    try {
      const canvas = await html2canvas(ref.current, { useCORS: true });
      const dataURL = canvas.toDataURL("image/png");
      downloadjs(dataURL, "tabla-de-precios.png", "image/png");
    } catch (e) {
      alert("Ocurrió un error al descargar la imagen 😢");
    } finally {
      final();
    }
  }, 0);
};

export default downloadImage;
