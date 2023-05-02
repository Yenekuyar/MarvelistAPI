import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css'

export default function ModalCharacter({ open, onClose, children, name, description, comicQuantities, src}: any) {
  if (!open) return null;

  const portal = document.getElementById('portal');

  return portal ? ReactDOM.createPortal(
    <>
      <div className='overlay-style'>
        <div className='modal-style'>
          <div className='modal-header'>
            <h1>{name}</h1>
          </div>
          <img src={src} alt={name} className='modal-image'/>
          <h2>Description:</h2>
          <br/>
          <p>
            {description}
          </p>
          <br />
          <h2>Comic Appearances:</h2>
          <br/>
          <p>This character appeared in {comicQuantities} comics until today.</p>
          <br/>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    portal
  ) : null;
}