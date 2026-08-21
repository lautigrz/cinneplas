import AvailabilityIndicator from "../../components/AvailabilityIndicator/AvailabilityIndicator";

function AvailableSeats({ idMovie }) {
    console.log(idMovie)
    return (
        <div className="mt-10 text-white flex flex-col gap-3">

            <h3 className="text-md sm:text-sm font-semibold">
                DISPONIBILIDAD DE BUTACAS
            </h3>

            <div className="flex flex-wrap gap-x-4 gap-y-2">
                

                <span className="flex items-center gap-1 text-xs sm:text-sm">
                    <AvailabilityIndicator level="high" />
                    Alta
                </span>

                <span className="flex items-center gap-1 text-xs sm:text-sm">
                    <AvailabilityIndicator level="medium" />
                    Media
                </span>

                <span className="flex items-center gap-1 text-xs sm:text-sm">
                    <AvailabilityIndicator level="low" />
                    Baja
                </span>

                <span className="flex items-center gap-1 text-xs sm:text-sm">
                    <AvailabilityIndicator level="full" />
                    Completa
                </span>

            </div>

        </div>
    );
}

export default AvailableSeats;