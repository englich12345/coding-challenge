import React, { Suspense } from 'react'
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom'

const Application = React.lazy(() => import("./components/views/Application"))

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback="loading">
          <Switch>
          <Route path="/application" component={Application} />
          <Redirect from="/" to="/application" />
          </Switch>
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
