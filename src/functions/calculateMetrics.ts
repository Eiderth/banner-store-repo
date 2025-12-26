import type { FormData, Products } from "../types";

function calculateMetrics(item: FormData): Products {
  const costoNum = Number(item.costo);
  const unidadesNum = Number(item.unidades);
  const porcentajeNum = Number(item.porcentaje) / 100;
  const precio_base = +(costoNum / unidadesNum).toFixed(2);

  const ganancia_unidad = +(precio_base * porcentajeNum).toFixed(2);

  const precio_final = +(precio_base + ganancia_unidad).toFixed(2);

  const ingresos = +(precio_final * unidadesNum).toFixed(2);

  const ganancia_total = +(ingresos - costoNum).toFixed(2);

  return {
    producto: item.producto,
    costo: costoNum,
    unidades: unidadesNum,
    ganancia_unidad,
    precio_base,
    precio_final,
    ingresos,
    ganancia_total,
  };
}

export default calculateMetrics;
