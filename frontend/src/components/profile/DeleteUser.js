import React, { Fragment, useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { GET_CURRENT_USER_QUERY } from '../auth/CurrentUser';
import { useHistory } from 'react-router-dom';
import { useApolloClient } from '@apollo/client';

import {
  DeleteButton,
  DeleteContainerModal,
  ConfirmDeleteModal,
  CancelDeleteModal,
} from './StyledComponents';
import Modal from '../Modal';

const DELETE_CURRENT_USER_MUTATION = gql`
  mutation DeleteCurrentUser {
    deleteCurrentUser {
      id
    }
  }
`;

const DeleteUser = () => {
  const [show, setShow] = useState(false);
  let client = useApolloClient();
  let history = useHistory();

  const showModal = () => {
    setShow(true);
  };

  const hideModal = () => {
    setShow(false);
  };

  const [deleteCurrentUser] = useMutation(DELETE_CURRENT_USER_MUTATION, {
    onCompleted() {
      localStorage.removeItem('auth-token');
      client.writeQuery({
        query: GET_CURRENT_USER_QUERY,
        data: {
          me: null,
        },
      });
      history.replace('/');
    },
  });

  return (
    <Fragment>
      <DeleteButton onClick={showModal}>
        Delete permanently your account
      </DeleteButton>
      <Modal show={show} setShow={setShow}>
        <DeleteContainerModal>
          <p>are you sure to delete your account?</p>
          <div className="control-buttom">
            <ConfirmDeleteModal onClick={deleteCurrentUser}>
              Confirm delete
            </ConfirmDeleteModal>
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
