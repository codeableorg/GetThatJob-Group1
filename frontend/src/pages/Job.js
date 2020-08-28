import React from 'react';
import { useParams }  from "react-router-dom";

import CurrentUser from '../components/auth/CurrentUser';
import JobRecruiter from '../components/job/JobRecruiter';
import JobProfessional from '../components/job/JobProfessional';
const Job = () => {
  let { id } = useParams();
   return <CurrentUser>
     {({ loaded, currentUser }) => {
       if (!loaded) {
         return null;
       } else if (currentUser.type === 'RECRUITER') {
         return <JobRecruiter jobId={id} />;
       } else {
         return <JobProfessional jobId={id} />;
       }
     }}
   </CurrentUser>
}

export default Job;