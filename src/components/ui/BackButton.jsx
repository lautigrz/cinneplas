import { useNavigate } from "react-router";

function BackButton({ label = "Volver", onClick, to }) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (onClick) {
            onClick();
        } else if (to) {
            navigate(to);
        } else {
            navigate(-1);
        }
    };

    return (
        <button
            onClick={handleClick}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-gray-900/90 hover:bg-gray-800 text-gray-300 hover:text-white border border-gray-800 text-sm font-medium transition-colors cursor-pointer mb-6 group shadow-sm"
        >
            <svg 
                xmlns="http://www.w3.org/2000/svg" 
                height="20px" 
                viewBox="0 -960 960 960" 
                width="20px" 
                fill="currentColor"
                className="transition-transform group-hover:-translate-x-1"
            >
                <path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/>
            </svg>
            <span>{label}</span>
        </button>
    );
}

export default BackButton;
