import React, { createContext, useContext, useEffect, useState } from "react";
const ModalContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useModalContext = () => {
  return useContext(ModalContext);
};
const ModalProvider = ({ children }) => {
  const [isModalShowing, setIsModalShowing] = useState(false);
  const [content, setContent] = useState(null);
  useEffect(() => {
    if (isModalShowing) {
      document.body.style.overflowY = "hidden";
    } else {
      document.body.style.overflowY = "auto";
    }
  }, [isModalShowing]);
  return (
    <ModalContext.Provider
      value={{ setContent, isModalShowing, setIsModalShowing }}
    >
      {children}
      {isModalShowing && (
        <div className="fixed inset-0 z-50 text-white">
          <div
            className="absolute inset-0 flex items-center justify-center bg-black/80"
            onClick={() => setIsModalShowing(false)}
          >
            {content}
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
};

export default ModalProvider;
