import {
  useCallback,
  useContext,
  useEffect,
  useReducer,
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
  IconTiltShiftFilled,
  IconFountain,
} from "@tabler/icons-react";
import Btn from "../../../components/Btn";
import Banner from "../../../components/Banner";
import Form from "../../../components/Form";
import InputIcon from "../../../components/InputIcon";
import Select from "../../../components/Select";

type Props = {};

const reducerStyle = (
  prev: typeof InitialstyleBanner,
  state:
    | {
        key: keyof typeof InitialstyleBanner;
        value: string;
        action: "EDIT";
      }
    | { action: "RESET" }
) => {
  switch (state.action) {
    case "EDIT":
      return {
        ...prev,
        [state.key]: state.value,
      };
    case "RESET":
      return InitialstyleBanner;
  }
};

const fonts = [
  "Arial, sans-serif",
  "Times New Roman serif",
  "Verdana, sans-serif",
  "Georgia, serif",
  "Courier New, monospace",
  "Comic Sans MS, cursive",
  "Impact, sans-serif",
  "Tahoma, sans-serif",
];
const InitialstyleBanner = {
  backgroundImage: "none",
  color: "black",
  title: "Lista de Precios",
  font: fonts[0],
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

  const [styleBanner, updateStyleBanner] = useReducer(
    reducerStyle,
    (() => {
      try {
        const data = localStorage.getItem("BannerStyle");
        return data ? JSON.parse(data) : InitialstyleBanner;
      } catch {
        return InitialstyleBanner;
      }
    })()
  );

  const editStyleBanner = useCallback(
    (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
      const name = e.target.name;
      switch (name) {
        case "bgImg-input": {
          const event = e as ChangeEvent<HTMLInputElement>;
          const file = event.target.files;
          if (file && file[0]) {
            const reader = new FileReader();
            reader.onload = function (e) {
              updateStyleBanner({
                key: "backgroundImage",
                value: `no-repeat center /cover url(${e.target?.result})`,
                action: "EDIT",
              });
            };
            reader.readAsDataURL(file[0]);
          }
          break;
        }
        case "textColor-input":
          updateStyleBanner({
            key: "color",
            value: `${e.target.value}`,
            action: "EDIT",
          });
          break;

        case "textTitle-input":
          updateStyleBanner({
            key: "title",
            value: `${e.target.value}`,
            action: "EDIT",
          });
          break;

        case "textFont-select":
          updateStyleBanner({
            key: "font",
            value: `${e.target.value}`,
            action: "EDIT",
          });
          break;
      }
    },
    []
  );

  useEffect(() => {
    if (!bannerRef.current) return;
    const bannerStyle = bannerRef.current.style;
    bannerStyle.background = styleBanner.backgroundImage;
    bannerStyle.color = styleBanner.color;
    bannerStyle.fontFamily = styleBanner.font;

    const DataJson = JSON.stringify(styleBanner);
    localStorage.setItem("BannerStyle", DataJson);
  }, [styleBanner]);

  return (
    <section className="h-full grid grid-rows-[80%_auto] place-items-center gap-2.5 relative">
      <Banner
        ref={bannerRef}
        title={styleBanner.title}
        headers={["producto", "precio"]}
        keys={["producto", "precio"]}
        data={products}
        className="w-[70%] max-w-80 min-h-[70%] bg-white "
        classNameTable="table-fixed lg:border-spacing-y-5"
      >
        <button
          className="bg-amber-100 p-2.5 rounded-full"
          onClick={handleDialog}
        >
          <IconEdit size={12} color="black" />
        </button>
      </Banner>

      <dialog
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-2xl border-4 border-amber-300 max-w-10/12 w-96 max-h-[80vh]"
        ref={dialogRef}
      >
        <Form
          title="Edicion de Banner"
          classNameTitle="md:text-2xl"
          className="w-full h-full border-none bg-transparent grid  md:grid-cols-2 gap-5 md:gap-10 "
        >
          <InputIcon
            label="fondo"
            type="file"
            name="bgImg-input"
            id="file-editInput"
            className="hidden"
            onChange={editStyleBanner}
          >
            <IconImageInPicture className="inline" />
          </InputIcon>

          <InputIcon
            label="Color de texto"
            type="color"
            name="textColor-input"
            id="color-editInput"
            className="hidden"
            onChange={editStyleBanner}
          >
            <IconColorPickerOff className="inline" />
          </InputIcon>

          <InputIcon
            label="Cambiar titulo"
            type="text"
            name="textTitle-input"
            id="title-editInput"
            value={styleBanner.title}
            className="w-full outline-0 pt-2"
            onChange={editStyleBanner}
          >
            <IconTiltShiftFilled className="inline" />
          </InputIcon>
          <Select
            label="Fuente"
            options={fonts}
            id="font-select"
            name="textFont-select"
            value={styleBanner.font}
            handleChangue={editStyleBanner}
          >
            <IconFountain className="inline" />
          </Select>

          <Btn
            text="Anular"
            type="button"
            className="bg-gray-500 shadow-2xl w-fit justify-self-start md:p-2.5"
            onClick={() => updateStyleBanner({ action: "RESET" })}
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
