import React, { Fragment, useState } from 'react';

import {
  DeleteButton,
  DeleteContainerModal,
  ConfirmDeleteModal,
  CancelDeleteModal,
} from './StyledComponents';
import Modal from '../Modal';

const DeleteUser = () => {
  const [show, setShow] = useState(false);

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  return (
    <Fragment>
      <DeleteButton onClick={showModal}>
        Delete permanently your account
      </DeleteButton>
      <Modal show={show} setShow={setShow}>
        <DeleteContainerModal>
          <p>are you sure to delete your account?</p>
          <div className="control-buttom">
            <ConfirmDeleteModal>Confirm delete</ConfirmDeleteModal>
            <CancelDeleteModal onClick={hideModal}>
              Cancel Delete
            </CancelDeleteModal>
          </div>
        </DeleteContainerModal>
      </Modal>
    </Fragment>
  );
};

export default DeleteUser;
