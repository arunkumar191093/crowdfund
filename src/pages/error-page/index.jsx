import { Link } from 'react-router-dom';

const ErrorPage = () => {
  return (
    <div className="flex flex-col items-center justify-center m-24">
      <h1 className="font-extrabold text-6xl">Oh oh!</h1>
      <p className="font-medium text-3xl">
        You are not authorised to view this page. Please login.
      </p>
      <Link to="/login" className="mt-10 p-2 border rounded-lg text-2xl font-bold text-blue-500">
        Login
      </Link>
    </div>
  )
}

export default ErrorPage;