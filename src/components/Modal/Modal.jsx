import React, { useEffect, useCallback } from 'react';
import css from './Modal.module.css';

const Modal = ({ currentImageUrl, onClose }) => {
  const handleEsc = useCallback((event) => {
    if (event.key === 'Escape') {
      onClose();
    }
  }, [onClose]);

  const handleOverlay = useCallback((event) => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  }, [onClose]);

  useEffect(() => {
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [handleEsc]);

  return (
    <div className={css.Overlay} onClick={handleOverlay}>
      <div className={css.Modal}>
        <img
          src={currentImageUrl}
          alt=""
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default Modal;