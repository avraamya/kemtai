import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import Start from './pages/Start/';
import End from './pages/End/';
import Camera from './pages/Camera/';
import Test from './pages/Test/';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/start" component={Start} />
        <Route path="/camera" component={Camera} />
        <Route path="/end" component={End} />
        <Route path="/test" component={Test} />
        <Redirect from="/" to="/start" />
      </Switch>
    </Router>
  );
}

export default App;
