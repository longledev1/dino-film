import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { IoClose } from "react-icons/io5";

const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  return useContext(ModalContext);
};

const ModalProvider = ({ children }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [content, setContent] = useState(null);

  const closeModal = useCallback(() => {
    setIsModalShowing(false);
    setContent(null);
  }, []);

  const openModal = useCallback((modalContent) => {
    setContent(modalContent);
    setIsModalShowing(true);
  }, []);

  useEffect(() => {
    if (isModalShowing) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
      }
    };

    if (isModalShowing) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isModalShowing, closeModal]);

  return (
    <ModalContext.Provider
      value={{
        content,
        setContent,
        isModalShowing,
        setIsModalShowing,
        openModal,
        closeModal,
      }}
    >
      {children}
      {isModalShowing && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md bg-black/85 transition-opacity duration-300 animate-fadeIn"
          onClick={closeModal}
        >
          {/* Nút Close góc trên bên phải */}
          <button
            onClick={closeModal}
            aria-label="Close modal"
            className="absolute top-5 right-5 z-60 flex h-11 w-11 cursor-pointer items-center justify-center rounded-full bg-white/10 text-white transition-all duration-200 hover:scale-110 hover:bg-white hover:text-black focus:outline-none"
          >
            <IoClose className="text-2xl" />
          </button>

          {/* Modal Container */}
          <div
            className="relative flex w-full max-w-4xl items-center justify-center transition-transform duration-300 scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
