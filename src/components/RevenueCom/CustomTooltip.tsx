export const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: any;
  label?: string;
}) => {
  if (active && payload && payload.length) {
    const total = payload.reduce(
      (sum: number, item: any) => sum + (item.value || 0),
      0
    );

    // ? format date [dd-mm-yyyy]:-
    // function formatDate(date: string) {
    //   const [y, m, d] = date.split("-");
    //   const months = [
    //     "Jan",
    //     "Feb",
    //     "Mar",
    //     "Apr",
    //     "May",
    //     "Jun",
    //     "Jul",
    //     "Aug",
    //     "Sep",
    //     "Oct",
    //     "Nov",
    //     "Dec",
    //   ];
    //   return `${d} ${months[+m - 1]} ${y}`;
    // }

    return (
      <div className="bg-[#e6f4f2] backdrop-blur-sm shadow-lg rounded-lg p-3 border border-[#c4e3df] max-w-[220px]">
        {/* label */}
        <p className="text-[#18564e] font-semibold text-xs mb-2 tracking-wide">
          {label}
        </p>

        {/* service */}
        <ul className="space-y-1 text-xs text-[#1e4d4f]">
          {payload.map((item: any, index: number) => (
            <li key={index} className="flex justify-between gap-4">
              <span
                className="font-xs truncate tracking-wide"
                style={{ color: item.stroke }}>
                {item.name}
              </span>
              <span className="font-semibold text-xs">₹{item.value}</span>
            </li>
          ))}
        </ul>

        {/*  Total */}
        <div className="mt-3 pt-2 border-t border-[#c8e6e4] text-xs font-bold text-[#00695c] flex justify-between">
          <span>Total</span>
          <span className="text-xs">₹{total}</span>
        </div>
      </div>
    );
  }

  return null;
};
