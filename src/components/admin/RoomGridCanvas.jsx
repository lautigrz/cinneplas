import { SEAT_TYPES } from "../../constants/seatTypes";

function RoomGridCanvas({
  gridRows,
  gridCols,
  seatsMap,
  processedSeatsMapLabels,
  onMouseDownCell,
  onMouseEnterCell,
}) {
  return (
    <div className="bg-liner-to-b from-[#161411] via-[#0f0e0c] to-[#090807] border border-gray-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl overflow-x-auto custom-scrollbar">
      <div className="w-full max-w-3xl sm:max-w-4xl mx-auto mb-10 text-center flex flex-col items-center">
        <div className="w-full h-3.5 sm:h-4 rounded-full bg-liner-to-r from-red-600 via-white to-red-600 shadow-[0_0_25px_rgba(239,68,68,0.9),0_0_12px_rgba(255,255,255,0.8)]" />
        <div className="w-full h-10 bg-liner-to-b from-white/15 via-red-500/10 to-transparent blur-md -mt-1" />
        <span className="text-xs font-black text-gray-300 tracking-[0.5em] uppercase block mt-2 drop-shadow">
          PANTALLA DE CINE
        </span>
      </div>

      <div className="flex flex-col items-center">
        <div
          className={`grid ${
            gridCols >= 22
              ? "gap-1 sm:gap-1.5 p-3"
              : gridCols >= 15
              ? "gap-1.5 sm:gap-2 p-4"
              : "gap-2 sm:gap-2.5 p-6"
          } bg-gray-950/90 rounded-2xl border border-gray-800/80 shadow-2xl justify-center`}
          style={{
            gridTemplateColumns: `repeat(${gridCols}, minmax(0, 1fr))`,
          }}
        >
          {Array.from({ length: gridRows }).map((_, y) =>
            Array.from({ length: gridCols }).map((_, x) => {
              const key = `${x}_${y}`;
              const seat = seatsMap[key];
              const labelObj = processedSeatsMapLabels[key];
              const seatType = seat ? SEAT_TYPES[seat.type] : null;

              const cellClass =
                gridCols >= 22
                  ? "w-5 h-5 sm:w-6.5 sm:h-6.5 rounded-sm text-[7px] sm:text-[9px]"
                  : gridCols >= 15
                  ? "w-6 h-6 sm:w-7.5 sm:h-7.5 rounded-md text-[8px] sm:text-[10px]"
                  : "w-7 h-7 sm:w-9 sm:h-9 rounded-lg text-[10px] sm:text-xs";

              return (
                <div
                  key={key}
                  onMouseDown={() => onMouseDownCell(x, y)}
                  onMouseEnter={() => onMouseEnterCell(x, y)}
                  title={`Posición X: ${x}, Y: ${y} ${
                    labelObj ? `(${labelObj.label})` : "[Pasillo]"
                  }`}
                  className={`
                    ${cellClass} flex flex-col items-center justify-center font-bold cursor-pointer transition-all duration-150 select-none
                    ${
                      seat
                        ? `${seatType.color} ${seatType.hoverColor} shadow-md scale-95 hover:scale-110`
                        : "bg-gray-900/40 border border-gray-800/60 hover:bg-gray-800/60 hover:border-gray-700 text-gray-600"
                    }
                  `}
                >
                  {seat ? (
                    <span>{labelObj ? labelObj.label : `${x},${y}`}</span>
                  ) : (
                    <span className="text-[7px] opacity-20">{x},{y}</span>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default RoomGridCanvas;
