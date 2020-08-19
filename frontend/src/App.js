import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Layout from './components/Layout';
import Auth from './components/Auth';
import SignIn from './pages/SignIn';
import SignUpRecruiter from './pages/SignUpRecruiter';
import SignUpProfessional from './pages/SignUpProfessional';

function App() {
  return (
    <Layout>
      <Switch>
        <Route exact path="/">
          <Index />
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
