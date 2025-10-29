import { useCallback, useContext, useRef, useState } from "react";
import { Context } from "../../../contexts/Contex";
import html2canvas from "html2canvas-pro";
import downloadjs from "downloadjs";
import { IconEdit, IconImageInPicture } from "@tabler/icons-react";
import Btn from "../../../components/Btn";
import Banner from "../../../components/Banner";
import Form from "../../../components/Form";
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

  const dialogRef = useRef<HTMLDialogElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const handleDialog = () => {
    if (!dialogRef.current) return;

    isOpen ? dialogRef.current.showModal() : dialogRef.current.close();

    setIsOpen(!isOpen);
  };
  return (
    <section className="h-full grid grid-rows-[80%_auto] place-items-center gap-2.5 relative">
      <Banner
        ref={bannerRef}
        title="Precios"
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        className="w-[70%] max-w-80 min-h-[70%]"
        classNameTable="table-fixed lg:border-spacing-y-5"
      >
        <button
          className="bg-amber-100 p-2.5 rounded-full"
          onClick={handleDialog}
        >
          <IconEdit size={12} />
        </button>
      </Banner>
      <dialog
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-4 border-amber-300 max-w-10/12 w-96"
        ref={dialogRef}
      >
        <Form
          title="Edicion de Banner"
          classNameTitle="md:text-2xl"
          className="w-full h-full border-none bg-transparent md:grid-cols-1 gap-5 md:gap-10 "
        >
          <label
            htmlFor="file"
            className="w-full h-fit rounded-2xl bg-amber-50 border-2 border-amber-300 p-2.5"
          >
            <IconImageInPicture className="inline" />{" "}
            <span className="inline">Fondo</span>
            <input type="file" id="file" className="hidden" />
          </label>
          <Btn
            text="Cerrar"
            type="button"
            className="bg-amber-300 shadow-2xl w-fit justify-self-end md:p-2.5"
            onClick={handleDialog}
          />
        </Form>
      </dialog>
      <Btn
        text="Descargar"
        className="bg-blue-400"
        onClick={handleDownloadImage}
      />
    </section>
  );
}
