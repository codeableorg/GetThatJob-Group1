import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';
import Jobs from './pages/Jobs';

function App() {
  return (
    <Switch>
      <Route exact path="/jobs">
        <Jobs />
      </Route>

      <Route exact path="/">
        <Index />
      </Route>
    </Switch>
  );
}

export default App;
