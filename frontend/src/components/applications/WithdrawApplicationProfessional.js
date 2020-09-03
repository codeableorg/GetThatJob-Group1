import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useApolloClient } from '@apollo/client';

import Modal from '../Modal';
import {
  DeleteContainerModal,
  ConfirmDeleteModal,
  CancelDeleteModal,
} from '../profile/StyledComponents';
import { APPLICATIONS_PROFESSIONAL } from './ApplicationsProfessional';

const WITHDRAW_APPLICATION = gql`
  mutation WithdrawApplicatiom($id: Int!) {
    withdrawApplication(id: $id) {
      id
    }
  }
`;

const WithdrawApplicationProfessional = ({
  application,
  show,
  setShow,
  setApplication,
}) => {
  let client = useApolloClient();

  const [withdrawApplication] = useMutation(WITHDRAW_APPLICATION, {
    variables: {
      id: parseInt(application.id),
    },
    onCompleted() {
      const applications = client.readQuery({
        query: APPLICATIONS_PROFESSIONAL,
      });
      const newApplications = applications.applicationsCurrentProfessional.filter(
        (app_cache) => {
          return app_cache.id !== application.id;
        }
      );
      console.log(newApplications);
      client.writeQuery({
        query: APPLICATIONS_PROFESSIONAL,
        data: { applicationsCurrentProfessional: newApplications },
      });
      setShow(false);
      setApplication(null);
    },
  });

  if (application === null) return null;

  return (
    <Modal show={show} closeModal={setShow}>
      <DeleteContainerModal>
        <p>are you sure to whitdraw your application?</p>
        <div className="control-buttom">
          <ConfirmDeleteModal
            onClick={() => {
              withdrawApplication();
            }}
          >
            Confirm whithdraw
          </ConfirmDeleteModal>
          <CancelDeleteModal
            onClick={() => {
              setShow(false);
            }}
          >
            Cancel whitdraw
          </CancelDeleteModal>
        </div>
      </DeleteContainerModal>
    </Modal>
  );
};

export default WithdrawApplicationProfessional;
