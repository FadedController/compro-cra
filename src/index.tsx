import ReactDOM from "react-dom";
import "tailwindcss/tailwind.css";
import "./index.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./pages";
import { AdminPage, LoginPage, UserPage } from "./pages/app";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/app">
          <Switch>
            <Route path="/app/admin" component={AdminPage} />
            <Route path="/app/user" component={UserPage} />
            <Route path="/app/login" component={LoginPage} />
            <Route path="/app/oops">oops</Route>
            <Redirect to="/app/login" />
          </Switch>
        </Route>
        <Route exact path="/" component={Home} />
        <Route path="*">404</Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
