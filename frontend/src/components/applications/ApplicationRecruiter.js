import React, { useEffect, useState } from 'react';

import Modal from '../Modal';
import { ApplicationDetailInfo, CursorPointer } from './StyledComponents';
import { ReactComponent as CancelSVG } from '../../assets/cancel.svg';

const ApplicationRecruiter = ({ application, setApplication, companyName }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
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
      {!application ? null : (
        <ApplicationDetailInfo>
          <div className="sidebar">
            <p className="title">{application.professional.name}</p>
            <p className="sub_title">{application.professional.description}</p>
          </div>
          <div className="header">
            <div className="options">
              <p className="option active">Application</p>
            </div>
            <CursorPointer as={CancelSVG} onClick={closeModal} />
          </div>
          <div className="content">
            <p className="title_section">Profesional Experience</p>
            <p className="text_section">{application.professionalExperience}</p>
            <p className="title_section">
              Why are you interested in working at {companyName}?
            </p>
            <p className="text_section">{application.reason}</p>
            <a
              className="download_cv"
              href={process.env.REACT_APP_HTTP + '/' + application.cvPath}
              rel="noopener noreferrer"
              target="_blank"
            >
              Download CV
            </a>
          </div>
        </ApplicationDetailInfo>
      )}
    </Modal>
  );
};

export default ApplicationRecruiter;
