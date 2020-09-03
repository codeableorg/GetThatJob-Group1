import React from 'react';
import ReactModal from 'react-modal';

const Modal = ({ children, show, closeModal }) => {
  return (
    <ReactModal
      isOpen={show}
      onRequestClose={() => {
        closeModal();
      }}
      style={{
        overlay: {
          position: 'fixed',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          backdropFilter: 'blur(8px)',
        },
        content: {
          width: 'fit-content',
          border: '1px solid #ccc',
          background: '#fff',
          WebkitOverflowScrolling: 'touch',
          borderRadius: '4px',
          outline: 'none',
        },
      }}
      contentLabel={'Example Modal'}
      portalClassName={'ReactModalPortal'}
      overlayClassName={'ReactModal__Overlay'}
      id={'some-id'}
      className={'ReactModal__Content'}
      bodyOpenClassName={'ReactModal__Body--open'}
      htmlOpenClassName={'ReactModal__Html--open'}
      ariaHideApp={true}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      shouldReturnFocusAfterClose={true}
      role={'dialog'}
      parentSelector={() => document.body}
      appElement={document.getElementById('root')}
      aria={{
        labelledby: 'heading',
        describedby: 'full_description',
      }}
      data={{ background: 'green' }}
    >
      {children}
    </ReactModal>
  );
};

export default Modal;
