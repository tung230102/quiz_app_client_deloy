import Dashboard from "../features/admin/Dashboard";

function DashboardPage({ authPermissions }) {
  return <Dashboard authPermissions={authPermissions} />;
}

export default DashboardPage;
