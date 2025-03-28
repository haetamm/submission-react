import { useSelector } from 'react-redux';

const usePermission = () => {
  const { authUser } = useSelector((state) => state.authUser);

  const isAuthenticated = () => !!authUser;

  return {
    isAuthenticated: isAuthenticated(),
    authUser,
  };
};

export default usePermission;