import store from "../state/store";

export const checkPermission = arrayPermissions => {
  const userPermissions = store.getState().user.permissions;

  if (userPermissions) {
    for (let i = 0; i < arrayPermissions.length; i++) {
      for (let j = 0; j < userPermissions.length; j++) {
        if (arrayPermissions[i] === userPermissions[j]) {
          return true;
        }
      }
    }
  }

  return false;
};
