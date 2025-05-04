"use client";
import React from 'react';
import './Modal.css'; // スタイルシートをインポート

const Modal = ({ isOpen, onClose, children }:{isOpen:boolean, onClose:()=>void,children :React.ReactNode})  => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;