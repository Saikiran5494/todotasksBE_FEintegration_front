import { Switch, Route } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignForm from "./components/SignForm";
import Tasks from "./components/Tasks";
import "./App.css";

function App() {
  return (
    <>
      <Switch>
        <Route exact path="/" component={LoginForm} />
        <Route exact path="/Signin" component={SignForm} />
        <Route exact path="/tasks" component={Tasks} />
      </Switch>
    </>
  );
}

export default App;
