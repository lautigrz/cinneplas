import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../context/useAuth";

function OAuthCallback() {
    const navigate = useNavigate();
    const { handleOAuthToken } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const token = params.get("token");

        console.log("OAuthCallback mounted. Query token:", token);

        if (!token) {
            console.warn("No token found in OAuthCallback URL, redirecting to /");
            navigate("/", { replace: true });
            return;
        }

        let isMounted = true;

        const processLogin = async () => {
            console.log("Processing OAuth token...");
            try {
                await handleOAuthToken(token);
                console.log("OAuth token processed successfully. Navigating to /");
            } catch (err) {
                console.error("Error processing OAuth token in callback:", err);
            } finally {
                if (isMounted) {
                    navigate("/", { replace: true });
                }
            }
        };

        processLogin();

        return () => {
            isMounted = false;
        };
    }, [navigate, handleOAuthToken]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-(--color-background) text-white">
            <div className="flex flex-col items-center gap-3">
                <svg className="animate-spin h-8 w-8 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <p className="text-gray-300 font-medium">Iniciando sesión con Google...</p>
            </div>
        </div>
    );
}

export default OAuthCallback;