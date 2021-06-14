import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import Workout from "./pages/Workout/";
import End from "./pages/End/";
import Camera from "./pages/Camera/";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/workout" component={Workout} />
        <Route path="/camera" component={Camera} />
        <Route path="/end" component={End} />
        <Redirect from="/" to="/workout" />
      </Switch>
    </Router>
  );
}

export default App;
