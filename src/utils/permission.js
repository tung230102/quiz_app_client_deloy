export const checkPermission = (permissions, action) => {
  if (permissions === undefined || permissions.includes("*")) return true;
  return permissions.includes(action);
};
