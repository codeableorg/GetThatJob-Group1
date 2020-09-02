import React from 'react';
import { gql, useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { CloseJobButton } from './StyledComponents';

const CLOSE_JOB = gql`
  mutation CloseJob($id: Int!) {
    closeJob(id: $id) {
      id
      closed
    }
  }
`;

const CloseJob = ({ job }) => {
  let history = useHistory();

  const [closeJob] = useMutation(CLOSE_JOB, {
    variables: {
      id: parseInt(job.id),
    },
    onCompleted() {
      history.push('/jobs');
    },
  });

  if (job.closed) return null;

  return <CloseJobButton onClick={closeJob}>Close this Job</CloseJobButton>;
};

export default CloseJob;
