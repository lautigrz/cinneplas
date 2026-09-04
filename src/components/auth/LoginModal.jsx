import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";
import AuthModalHeader from "./AuthModalHeader";
import AuthTabSelector from "./AuthTabSelector";
import AuthAlert from "./AuthAlert";
import AuthFormFields from "./AuthFormFields";
import AuthFooterBadge from "./AuthFooterBadge";

function LoginModal() {
  const {
    isAuthModalOpen,
    closeAuthModal,
    authModalTab,
    setAuthModalTab,
    login,
    loginWithGoogle,
    register,
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const resetAuthForm = () => {
    setErrorMessage("");
    setSuccessMessage("");
    setEmail("");
    setPassword("");
    setName("");
    setShowPassword(false);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape" && isAuthModalOpen) {
        closeAuthModal();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email || !email.includes("@")) {
      setErrorMessage("Por favor, ingresa un correo electrónico válido.");
      return;
    }

    if (!password || password.length < 2) {
      setErrorMessage("La contraseña debe tener al menos 6 caracteres.");
      return;
    }

    if (authModalTab === "register" && !name.trim()) {
      setErrorMessage("Por favor, ingresa tu nombre completo.");
      return;
    }

    setLoading(true);

    try {
      if (authModalTab === "login") {
        const res = await login({ email, password });
        setSuccessMessage(res.message || "¡Bienvenido a Cineplas!");
      } else {
        const res = await register({ name, email, password });
        setSuccessMessage(res.message || "¡Cuenta creada exitosamente!");
      }

      setTimeout(() => {
        closeAuthModal();
      }, 1200);
    } catch (err) {
      setErrorMessage(err.message || "Ocurrió un error al procesar tu solicitud.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    loginWithGoogle();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={closeAuthModal}
    >
      <div
        className="relative w-full max-w-md bg-(--color-card) border border-gray-800 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden text-white transition-all transform animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <AuthModalHeader tab={authModalTab} onClose={closeAuthModal} />

        <AuthTabSelector
          activeTab={authModalTab}
          onSelectTab={setAuthModalTab}
          onTabChange={resetAuthForm}
        />

        <AuthAlert type="error" message={errorMessage} />
        <AuthAlert type="success" message={successMessage} />

        <div className="mb-4">
          <button
            type="button"
            disabled={loading}
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-900/90 hover:bg-gray-800 border border-gray-700 text-gray-200 hover:text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 cursor-pointer shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span>Continuar con Google</span>
          </button>

          <div className="relative my-4 flex items-center justify-center">
            <div className="border-t border-gray-800 w-full"></div>
            <span className="bg-(--color-card) px-3 text-xs font-semibold uppercase text-gray-400 shrink-0">
              o con email
            </span>
            <div className="border-t border-gray-800 w-full"></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <AuthFormFields
            tab={authModalTab}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            showPassword={showPassword}
            setShowPassword={setShowPassword}
            rememberMe={rememberMe}
            setRememberMe={setRememberMe}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-liner-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-semibold py-3 px-4 rounded-xl shadow-lg shadow-red-900/30 transition-all duration-200 cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Procesando...</span>
              </>
            ) : (
              <span>
                {authModalTab === "login" ? "Iniciar Sesión" : "Crear Mi Cuenta"}
              </span>
            )}
          </button>
        </form>

        <AuthFooterBadge />
      </div>
    </div>
  );
}

export default LoginModal;
