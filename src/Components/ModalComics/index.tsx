import React from 'react';
import ReactDOM from 'react-dom';
import '../ModalCharacter/Modal.css'

export default function ModalComics({ open, onClose, children, title, description, comicQuantities, src}: any) {
  if (!open) return null;

  const portal = document.getElementById('portal');

  return portal ? ReactDOM.createPortal(
    <>
      <div className='overlay-style'>
        <div className='modal-style'>
          <div className='modal-header'>
            <h1>{title}</h1>
          </div>
          <img src={src} alt={title} className='modal-image'/>
          <h2>Description:</h2>
          <br/>
          <p>
            {description}
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    portal
  ) : null;
}