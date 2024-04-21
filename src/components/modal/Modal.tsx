import React, { ReactNode, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import modalStyle from "./modal.module.css";

const modalRoot = document.getElementById("react-modals") as HTMLElement;

interface ModalOverlayProps {
  onClose: () => void;
  children: ReactNode;
}

const ModalOverlay: React.FC<ModalOverlayProps> = ({ onClose, children }) => (
  <div className={modalStyle["modal-overlay"]} onClick={onClose}>
    {children}
  </div>
);

interface ModalProps {
  title?: string;
  onClose: () => void;
  children?: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div
        className={`${modalStyle.modal} p-10`}
        onClick={(e: React.MouseEvent<HTMLDivElement>) => e.stopPropagation()}
      >
        <div className={`${modalStyle["modal-header"]} mb-5`}>
          <p className="text text_type_main-large">{title}</p>
          <div className={modalStyle["modal-close"]} onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className={modalStyle["modal-body"]}>{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

export default Modal;
