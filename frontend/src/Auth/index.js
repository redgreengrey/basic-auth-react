import React, { Component } from "react";
import { withRouter } from "react-router-dom";

const { Provider, Consumer: AuthConsumer } = React.createContext();

class AuthProvider extends Component {
  state = {
    isAuthorized: false,
    username: null,
    error: null,
  };

  authorize = (username) => {
    this.setState({ ...this.state, isAuthorized: true, username }, () => {
      this.props.history.push("/users");
    });
  };

  unauthorize = () => {
    this.setState(
      { ...this.state, isAuthorized: false, username: null },
      () => {
        this.props.history.push("/");
      }
    );
  };

  render() {
    const { isAuthorized, username } = this.state;

    return (
      <Provider
        value={{
          isAuthorized,
          username,
          authorize: this.authorize,
          unauthorize: this.unauthorize,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export function withAuth(WrappedComponent) {
  return class AuthHOC extends Component {
    render() {
      return (
        <AuthConsumer>
          {(contextProps) => (
            <WrappedComponent {...contextProps} {...this.props} />
          )}
        </AuthConsumer>
      );
    }
  };
}

const AuthProviderWithRouter = withRouter(AuthProvider);

export { AuthProviderWithRouter as AuthProvider };
