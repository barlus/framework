import * as React from "@barlus/react";

import {hoistStatics} from "@barlus/redux/react/utils/nonEeactStatics";
import {Route}        from "./Route";


/**
 * A public higher-order component to access the imperative API
 */
export const withRouter = Component => {
  const C: any = props => {
    const { wrappedComponentRef, ...remainingProps } = props;
    return (
      <Route
        children={routeComponentProps => (
          <Component
            {...remainingProps}
            {...routeComponentProps}
            ref={wrappedComponentRef}
          />
        )}
      />
    );
  };

  C.displayName = `withRouter(${Component.displayName || Component.name})`;
  C.WrappedComponent = Component;
  C.propTypes = {
    wrappedComponentRef: React.PropTypes.func
  };

  return hoistStatics(C, Component);
};

export default withRouter;
