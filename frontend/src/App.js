import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Index from './pages/Index';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Index />
      </Route>
    </Switch>
  );
}

export default App;
