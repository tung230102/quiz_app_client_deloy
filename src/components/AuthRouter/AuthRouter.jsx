import { Suspense } from "react";
import { Navigate } from "react-router-dom";
import { Loader } from "~/common";
import {
  checkPermission,
  isAuthenticated,
  userDataLocalStorage,
} from "~/utils";

export const AuthRouter = ({ children, permissions, authPermissions }) => {
  const isLoggedIn = isAuthenticated();
  const { userData } = userDataLocalStorage();

  const hasPermission = () => {
    if (!permissions) return true;
    return permissions.some((role) => userData?.role?.includes(role));
  };

  const hasReadPermission = checkPermission(authPermissions, "read");

  if (!hasReadPermission) {
    return <Navigate to="/404" replace />;
  }

  if (!hasPermission()) {
    return <Navigate to="/404" replace />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Suspense fallback={<Loader />}>{children}</Suspense>;
};

export default AuthRouter;
