import React from 'react';
import { Route } from 'react-router-dom';

import Layout from './components/Layout';

function App() {
  return (
    <Layout>
      <Route exact path="/">
        Index
      </Route>
    </Layout>
  );
}

export default App;
