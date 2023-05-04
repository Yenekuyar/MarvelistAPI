import React from 'react';
import ReactDOM from 'react-dom';
import '../Modal.css'

export default function ModalCreators({ open, onClose, firstName, src, series, comics, stories, urls}: any) {
  if (!open) return null;

  const portal = document.getElementById('portal');

  return portal ? ReactDOM.createPortal(
    <>
      <div className='overlay-style'>
        <div className='modal-style'>
          <div className='modal-header'>
            <h1>{firstName}</h1>
          </div>
          <img src={src} alt={firstName} className='modal-image'/>
          <div className='modal-content'>
            <br/>
            <div>
              <h2>Series Made:</h2>
              <p>{firstName} made {series} series on total.</p>
              <br />
            </div>
            <div>
              <h2>Comics Made:</h2>
              <p>{firstName} made {comics} comics on total.</p>
              <br />
            </div>
            <div>
              <h2>Stories Made:</h2>
              <p>{firstName} made {stories} stories on total.</p>
              <br />
            </div>
            <p>If you want to know more about this creator, check out directly on Marvel website</p>
            <br />
              <h2 className='modal-url'>
                <a href={urls}>Website Link</a>
              </h2>
          </div>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    portal
  ) : null;
}