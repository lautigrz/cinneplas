function Seat({ seat, selected, onSelect }) {

    let color = "bg-green-500";

    if (seat.status === "occupied") {
        color = "bg-gray-600";
    }

    if (selected) {
        color = "bg-red-600";
    }

    return (
        <button
            disabled={seat.status === "occupied"}
            onClick={() => onSelect(seat)}
            className={`${color} w-10 h-10 rounded-t-lg`}
        >
            {seat.number}
        </button>
    );
}


export default Seat;