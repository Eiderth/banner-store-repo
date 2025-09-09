type Props = {
  headers: string[];
};

export default function Banner({ headers }: Props) {
  return (
    <table className="table-fixed rounded-3xl border-4 border-separate border-spacing-0 border-blue-400 p-1">
      <thead>
        <tr>
          {headers.map((header) => (
            <th
              key={header}
              className="p-0.5 text-xs font-bold text-balance break-words text-center md:p-2"
            >
              {header.toUpperCase()}
            </th>
          ))}
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  );
}
