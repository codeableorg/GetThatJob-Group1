import React, { useEffect, useState } from 'react';

import Modal from '../Modal';

const ApplicationDetail = ({ application, setApplication }) => {
  const [show, setShow] = useState(false);
  const content = <p>holi</p>;
  useEffect(() => {
    console.log('change application');
    if (application === null) {
      setShow(false);
    } else {
      setShow(true);
    }
  }, [application]);

  const closeModal = () => {
    setApplication(null);
  };

  return (
    <Modal show={show} closeModal={closeModal}>
      {content}
    </Modal>
  );
};

export default ApplicationDetail;
