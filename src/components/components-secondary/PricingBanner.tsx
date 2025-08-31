type Props = {};

export default function PricingBanner({}: Props) {
  return (
    <table className="rounded-3xl border-4 border-separate border-spacing-0 border-blue-400 p-3">
      <thead>
        <tr>
          <th className="p-2">Producto</th>
          <th className="p-2">Costo</th>
          <th className="p-2">Cantidad</th>
          <th className="p-2">Porcentaje</th>
          <th className="p-2">Precio por unidad</th>
          <th className="p-2">IVA</th>
          <th className="p-2">Precio final</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td className="p-2">Harina</td>
          <td className="p-2">30</td>
          <td className="p-2">20 uds</td>
          <td className="p-2">5%</td>
          <td className="p-2">1.5</td>
          <td className="p-2">No</td>
          <td className="p-2">1.5</td>
        </tr>
      </tbody>
    </table>
  );
}
