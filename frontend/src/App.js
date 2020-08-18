import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Layout from './components/Layout';

function App() {
  return (
    <Switch>
      <Layout>
        <Route exact path="/">
          <Index />
        </Route>
      </Layout>
    </Switch>
  );
}

export default App;
