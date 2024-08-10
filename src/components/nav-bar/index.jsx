import { useContext } from 'react';
import { Link } from 'react-router-dom';
import PopoverMenu from '../popover-menu';
import { AuthContext } from '../../context/auth-context';
import { ChevronDownIcon } from '@heroicons/react/24/solid'

const routes = [
  {
    label: "All Projects",
    url: "/projects",
    isAuthRequired: false,
  },
  {
    label: "My Projects",
    url: "/my-projects",
    isAuthRequired: true,
  },
]

const NavBar = () => {

  const { isLoggedIn, handleLogout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-800">
      <div className="mx-auto px-2 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {/* Icon when menu is closed */}
              <svg
                className="block h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              {/* Icon when menu is open */}
              <svg
                className="hidden h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="flex w-full items-center justify-between">
            <div className="flex flex-row ml-10">
              <Link to="/" className="text-white text-2xl font-bold">
                Crowdfunding
              </Link>
              <div className="hidden sm:flex sm:ml-6">
                <div className="flex space-x-4">
                  {
                    routes.map(route => {

                      if (!isLoggedIn && route.isAuthRequired) return null;

                      return (<Link
                        key={route.url}
                        to={route.url}
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                      >
                        {route.label}
                      </Link>)
                    }
                    )
                  }
                </div>
              </div>
            </div>
            {
              isLoggedIn ?
                <div>
                  <PopoverMenu mainButtonText={
                    <div className='flex items-center'>
                      <p className='mr-2'>Arun Kumar</p>
                      <ChevronDownIcon className="h-4 w-4" />
                    </div>
                  }>
                    <button type="button" onClick={handleLogout}>Logout</button>
                  </PopoverMenu>
                </div> :
                <div>
                  <Link to="/login" className="p-2 border rounded-lg font-bold text-white">
                    Login
                  </Link>
                </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default NavBar;