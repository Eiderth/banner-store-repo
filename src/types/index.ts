export type Products = {
  producto: string;
  costo: number;
  unidades: number;
  ganancia: number;
  iva: number;
  precio_base: number;
  precio: number;
};
export type FormData = {
  producto: string;
  costo: string;
  unidades: string;
  porcentaje: string;
  iva: boolean;
  precio: string;
};
export type Links = {
  li: string;
  link: "form" | "data" | "banner";
};
