import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

export default function Modal({ open, onClose,  }: any) {
  if (!open) return null;

  const portal = document.getElementById('portal');

  return portal ? ReactDOM.createPortal(
    <>
      <div className='overlay-style'>
        <div className='modal-style'>
          <h2></h2>
          <button onClick={onClose}>X</button>
        </div>
        
      </div>
    </>,
    portal
  ) : null;
}