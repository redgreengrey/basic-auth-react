import { withAuth } from "../../Auth";
import { Redirect, Route } from "react-router-dom";

export const PrivateRoute = withAuth(
  ({ component: RouteComponent, isAuthorized, ...rest }) => (
    <Route
      {...rest}
      render={(routeProps) =>
        isAuthorized ? (
          <RouteComponent {...routeProps} />
        ) : (
          <Redirect to={"/login"} />
        )
      }
    />
  )
);
