import {
  useCallback,
  useContext,
  useRef,
  useState,
  type ChangeEvent,
} from "react";
import { Context } from "../../../contexts/Contex";
import html2canvas from "html2canvas-pro";
import downloadjs from "downloadjs";
import {
  IconColorPickerOff,
  IconEdit,
  IconImageInPicture,
} from "@tabler/icons-react";
import Btn from "../../../components/Btn";
import Banner from "../../../components/Banner";
import Form from "../../../components/Form";

type Props = {};
const InitialstyleBanner = {
  background: "white",
  color: "black",
};

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
        alert("error en descarga 😢");
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

  const editStyleBanner = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!bannerRef.current) return;
    const banner = bannerRef.current;
    const name = e.target.name;
    if (name === "bgImg-input") {
      const file = e.target.files;
      if (file && file[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          banner.style.background = `no-repeat center /cover url(${e.target?.result})`;
        };
        reader.readAsDataURL(file[0]);
      }
    }

    if (name === "textColor-input") {
      const color = e.target.value;

      banner.style.color = color;
    }
  }, []);

  const resetBanner = () => {
    if (!bannerRef.current) return;

    bannerRef.current.style.background = InitialstyleBanner.background;
    bannerRef.current.style.color = InitialstyleBanner.color;
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
          className="w-full h-full border-none bg-transparent grid-cols-2 md:grid-cols-2 gap-5 md:gap-10 "
        >
          <label
            htmlFor="file"
            className="w-full h-fit rounded-2xl bg-amber-50 border-2 border-amber-300 p-2.5 active:bg-amber-400 col-span-full"
          >
            <IconImageInPicture className="inline" />
            <span className="inline">Fondo</span>
            <input
              type="file"
              name="bgImg-input"
              id="file"
              className="hidden"
              onChange={editStyleBanner}
            />
          </label>
          <label
            htmlFor="color"
            className="w-full h-fit rounded-2xl bg-amber-50 border-2 border-amber-300 p-2.5 active:bg-amber-400 col-span-full"
          >
            <IconColorPickerOff className="inline" />
            <span className="inline">Fondo</span>
            <input
              type="color"
              name="textColor-input"
              id="color"
              className="hidden"
              onChange={editStyleBanner}
            />
          </label>
          <Btn
            text="Anular"
            type="button"
            className="bg-gray-500 shadow-2xl w-fit justify-self-start md:p-2.5"
            onClick={resetBanner}
          />
          <Btn
            text="Cerrar"
            type="button"
            className="bg-amber-300 shadow-2xl w-full md:p-2.5"
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
