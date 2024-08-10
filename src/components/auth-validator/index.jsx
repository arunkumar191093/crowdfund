import { useContext } from "react";
import { AuthContext } from '../../context/auth-context';
import { Navigate } from "react-router-dom";

const AuthValidator = ({
  children
}) => {
  const authCtx = useContext(AuthContext);

  if (!authCtx.isLoggedIn) {
    return <Navigate to="/not-authorised" replace={true} />
  }

  return children;
}

export default AuthValidator;