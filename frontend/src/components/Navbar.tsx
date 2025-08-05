import { useState } from 'react';
import withAuth from './withAuth';
import { FaRegUserCircle } from 'react-icons/fa';
import { IoStatsChart, IoLogOut } from 'react-icons/io5';
import { useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="sticky top-0 bg-olive text-white px-4 py-3 flex justify-between items-center z-[2116]">
      <p className="text-2xl">Welcome debilu to Flashcards</p>

      <div className="text-3xl flex justify-center items-center gap-3 relative">
        <IoStatsChart
          aria-label="Statistics"
          onClick={() => navigate('/statistics')}
          className="cursor-pointer"
        />

        {/* Profile Icon and Dropdown */}
        <div className="relative">
          <FaRegUserCircle
            onClick={handleOpen}
            className="cursor-pointer"
          />

          {open && (
            <ul className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
              <li>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-xl">
                  Change password
                </button>
              </li>
              <li>
                <button className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 text-xl">
                  Change profile picture
                </button>
              </li>
            </ul>
          )}
        </div>

        <IoLogOut
          aria-label="Logout"
          onClick={() => {
            localStorage.removeItem('token');
            navigate('/login');
          }}
          className="text-4xl cursor-pointer"
        />
      </div>
    </div>
  );
}

const AuthNavbar = withAuth(Navbar);
export default AuthNavbar;
