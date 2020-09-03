import React, { Fragment, useEffect, useState } from 'react';

import Modal from '../Modal';
import { ApplicationDetailInfo, CursorPointer } from './StyledComponents';
import { ReactComponent as CancelSVG } from '../../assets/cancel.svg';

const ApplicationProfessional = ({ application, setApplication }) => {
  const [show, setShow] = useState(false);
  const [option, setOption] = useState('application');

  useEffect(() => {
    if (application === null) {
      setShow(false);
      setOption('application');
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
            <p className="name">{application.job.title}</p>
            <p className="professional_description">
              {application.job.recruiter.companyName}
            </p>
          </div>
          <div className="header">
            <div className="options">
              <p
                className={
                  option === 'application' ? 'option active' : 'option'
                }
                onClick={() => {
                  setOption('application');
                }}
              >
                Application
              </p>
              <p
                className={option === 'job_detail' ? 'option active' : 'option'}
                onClick={() => {
                  setOption('job_detail');
                }}
              >
                Job Details
              </p>
            </div>
            <CursorPointer as={CancelSVG} onClick={closeModal} />
          </div>
          <div className="content">
            {option === 'application' ? (
              <Fragment>
                <p className="title_section">Profesional Experience</p>
                <p className="text_section">
                  {application.professionalExperience}
                </p>
                <p className="title_section">
                  Why are you interested in working at
                  {application.job.recruiter.companyName}?
                </p>
                <p className="text_section">{application.reason}</p>
              </Fragment>
            ) : null}
            {option === 'job_detail' ? (
              <Fragment>
                <p className="text_section">{application.job.introduction}</p>
                <p className="title_section">What will be expected of you:</p>
                <p className="text_section">{application.job.expected}</p>
                <p className="title_section">What we are looking for:</p>
                <p className="text_section">{application.job.lookingFor}</p>
                <p className="title_section">Job requirements:</p>
                <p className="text_section">{application.job.requirements}</p>
                <p className="title_section">
                  About {application.job.recruiter.companyName}:
                </p>
                <p className="text_section">
                  {application.job.recruiter.companyDescription}
                </p>
              </Fragment>
            ) : null}
          </div>
        </ApplicationDetailInfo>
      )}
    </Modal>
  );
};

export default ApplicationProfessional;
