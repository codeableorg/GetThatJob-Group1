import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';

import Layout from './components/Layout';
import Auth from './components/Auth';
import SignIn from './pages/SignIn';
import SignUpRecruiter from './pages/SignUpRecruiter';
import SignUpProfessional from './pages/SignUpProfessional';
import Jobs from './pages/Jobs';
import Protected from './components/Protected';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path={['/jobs']}>
          <Protected>
            <Route exact path="/jobs">
              <Jobs />
            </Route>
          </Protected>
        </Route>
        <Route path={['/sign-in', '/sign-up']}>
          <Auth>
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
          </Auth>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
