import React, { Suspense } from 'react'
import { Route, BrowserRouter } from 'react-router-dom'

const Application = React.lazy(() => import("./components/views/Application"))

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Suspense fallback="loading">
          <Route path="" component={Application} />
        </Suspense>
      </BrowserRouter>
    </div>
  );
}

export default App;
