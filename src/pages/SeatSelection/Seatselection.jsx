import SeatMap from "./SeatMap";

function SeatSelection() {
    return (
        <div className="flex flex-col items-center gap-6 bg-(--color-background) p-6 shadow-lg">
            <h2 className="text-blue-400 text-lg font-semibold">
                Selecciona tus butacas
            </h2>

            <SeatMap
                seats={seats}
                selectedSeats={[]}
                onSelectSeat={() => {}}
            />
        </div>
    );
}


const rows = "ABCDEFGHIJKL".split("");
const aisleColumns = [5, 10, 14];

const seats = rows.flatMap((row, rowIndex) => {
    let seatNumber = 1;

    return Array.from({ length: 16 }, (_, index) => {
        const positionX = index + 1;

        // No existe una butaca en el pasillo
        if (aisleColumns.includes(positionX)) {
            return null;
        }

        const seat = {
            id: `${row}${seatNumber}`,
            row,
            number: seatNumber,
            positionX,
            positionY: rowIndex + 1,
            status: "available"
        };

        seatNumber++;

        return seat;
    }).filter(Boolean);
});


export default SeatSelection;