import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Layout from './components/Layout';
import Auth from './components/Auth';
import SignupRecruiter from './pages/SignupRecruiter';
import SignupProfessional from './pages/SignupProfessional';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Index />
        </Route>
        <Route path={['/sign-in', '/sign-up']}>
          <Auth>
            <Route
              exact
              path="/sign-up/recruiter"
              component={SignupRecruiter}
            />
            <Route
              exact
              path="/sign-up/professional"
              component={SignupProfessional}
            />
          </Auth>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
