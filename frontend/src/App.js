import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./pages/Home";
import Users from "./pages/Users";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Nav from "./components/Nav";
import "antd/dist/antd.css";
import { AuthProvider } from "./Auth";
import { PrivateRoute } from "./pages/PrivateRoute/PrivateRoute";

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Nav />

        <div className="content">
          <Switch>
            <PrivateRoute path="/users" component={Users} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/" component={Home} exact />
          </Switch>
        </div>
      </AuthProvider>
    </Router>
  );
};

export default App;
