import { useContext, useState } from "react";
import { AuthContext } from '../../context/auth-context';
import { Navigate, Link } from "react-router-dom";
import InputText from '../../components/input-text';


const LoginPage = () => {

  const authCtx = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    authCtx.handleLogin();
  }

  if (authCtx.isLoggedIn) {
    return <Navigate to="/projects" replace={true} />
  }

  return (
    <div className="flex items-center justify-center mt-24">
      <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full">
          <div>
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
              Log in to your account
            </h2>
          </div>
          <form className="mt-8" onSubmit={handleLogin}>
            <div className="rounded-md shadow-sm">
              <InputText
                label="Username/Email"
                placeholder="Enter Username/Email"
                type="email"
                isRequired
                value={email}
                onChange={setEmail}
              />

              <InputText
                label="Password"
                placeholder="Enter Password"
                type="password"
                isRequired
                value={password}
                onChange={setPassword}
              />
            </div>

            <div className="flex items-center justify-between my-4">
              <div className="text-sm font-medium text-indigo-600 hover:text-indigo-500">
                Forgot your password?
              </div>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-gray-700 hover:bg-gray-600 "
            >
              Log in
            </button>
          </form>
          <Link to="/sign-up" className="flex self-center justify-center mt-4 p-2 text-sm text-center font-medium text-indigo-600 hover:text-indigo-500">
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}

export default LoginPage;