import React from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css'

export default function ModalComics({ open, onClose, pageCount, title, src, creator, price, description}: any) {
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
          <div className='modal-content'>
            <br/>
              <p>{description}</p>
            <br />
              {creator && <p>
                  The creator of this comic is {creator}.
              </p>}
            <br />
              <p>
                  This comic has {pageCount} pages.
              </p>
            <br />
            {price !== 0 && <p>
                The price of this comic is {price} $
            </p>}
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    portal
  ) : null;
}