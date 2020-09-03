import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Layout from './components/Layout';
import Auth from './components/Auth';
import SignIn from './pages/SignIn';
import SignUpRecruiter from './pages/SignUpRecruiter';
import SignUpProfessional from './pages/SignUpProfessional';
import JobsApply from './pages/JobsApply';
import Protected from './components/Protected';
import Profile from './pages/Profile';
import NewJob from './pages/NewJob';
import Job from './pages/Job';
import Jobs from './pages/Jobs';
import ApplicationsEdit from './pages/ApplicationsEdit';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path={['/jobs', '/profile', '/applications']}>
          <Protected>
            <Switch>
              <Route exact path="/jobs/new">
                <NewJob />
              </Route>
              <Route exact path="/jobs/:id">
                <Job />
              </Route>
              <Route exact path="/jobs">
                <Jobs />
              </Route>
              <Route exact path="/jobs/:id/apply">
                <JobsApply />
              </Route>
              <Route exact path="/applications/:id/edit">
                <ApplicationsEdit />
              </Route>
              <Route exact path="/profile">
                <Profile />
              </Route>
            </Switch>
          </Protected>
        </Route>
        <Route path={['/sign-in', '/sign-up']}>
          <Auth>
            <Switch>
              <Route exact path="/sign-in" component={SignIn} />
              <Route
                exact
                path="/sign-up/recruiter"
                component={SignUpRecruiter}
              />
              <Route
                exact
                path="/sign-up/professional"
                component={SignUpProfessional}
              />
            </Switch>
          </Auth>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
