import { Fragment, lazy, useEffect, useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Loader } from "~/common";
import AuthRouter from "~/components/AuthRouter";
import ForgotPasswordPage from "~/pages/ForgotPasswordPage";
import LoginPage from "~/pages/LoginPage";
import RegisterPage from "~/pages/RegisterPage";
import { routes } from "~/routes";

const DefaultLayout = lazy(() => import("~/layouts"));
const PageNotFound = lazy(() => import("~/pages/PageNotFound"));

function AppRoutes() {
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      isLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/404" element={<PageNotFound />} />
      <Route>
        {routes.map(
          ({
            path,
            component: Component,
            layout,
            permissions,
            authPermissions,
          }) => {
            let Layout = DefaultLayout;
            if (layout) {
              Layout = layout;
            } else if (layout === null) {
              Layout = Fragment;
            }
            return (
              <Route
                key={path}
                path={path}
                element={
                  <AuthRouter
                    permissions={permissions}
                    authPermissions={authPermissions}
                  >
                    <Layout>
                      <Component authPermissions={authPermissions} />
                    </Layout>
                  </AuthRouter>
                }
              />
            );
          }
        )}
      </Route>

      <Route path="/" element={<Navigate to="/play" replace />} />
      <Route path="*" element={<Navigate to="404" replace />} />
    </Routes>
  );
}

export default AppRoutes;
