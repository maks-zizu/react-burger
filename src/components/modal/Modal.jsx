import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import './modal.css';

const modalRoot = document.getElementById('react-modals');

const ModalOverlay = ({ onClose, children }) => (
  <div className="modal-overlay" onClick={onClose}>
    {children}
  </div>
);

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

const Modal = ({ title, onClose, children }) => {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return ReactDOM.createPortal(
    <ModalOverlay onClose={onClose}>
      <div className="modal p-10" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header mb-5">
          <p className="text text_type_main-large">{title}</p>
          <div className="modal-close" onClick={onClose}>
            <CloseIcon type="primary" />
          </div>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </ModalOverlay>,
    modalRoot
  );
};

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default Modal;
