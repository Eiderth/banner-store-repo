import { useCallback, useContext, useRef } from "react";
import { Context } from "../../../contexts/Contex";
import html2canvas from "html2canvas-pro";
import downloadjs from "downloadjs";
import { IconEdit } from "@tabler/icons-react";
import Btn from "../../../components/Btn";
import Banner from "../../../components/Banner";
type Props = {};

export default function SectionBanner({}: Props) {
  const { products } = useContext(Context);
  const bannerRef = useRef<HTMLDivElement | null>(null);

  const handleDownloadImage = useCallback(async () => {
    if (bannerRef.current) {
      try {
        const canvas = await html2canvas(bannerRef.current, {
          useCORS: true,
        });
        const dataURL = canvas.toDataURL("image/png");
        downloadjs(dataURL, "tabla-de-precios.png", "image/png");
      } catch {
        alert("error en descarga");
      }
    }
  }, []);

  return (
    <section className="h-full grid grid-rows-[80%_auto] place-items-center gap-2.5">
      <Banner
        ref={bannerRef}
        title="Precios"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        className="w-[70%] max-w-80 min-h-[70%]"
        classNameTable="table-fixed lg:border-spacing-y-5"
      >
        <button className="bg-amber-100 p-2.5 rounded-full">
          <IconEdit size={12} />
        </button>
      </Banner>
      <Btn
        text="Descargar"
        className="bg-blue-400"
        onClick={handleDownloadImage}
      />
    </section>
  );
}
