import ReactDOM from "react-dom";
import "./index.css";
import "tailwindcss/tailwind.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Test from "./pages/test";
import Home from "./pages";

export const App = () => {
  return (
    <Router>
      <Switch>
        <Route path="/test">
          <Test />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
