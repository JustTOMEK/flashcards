import { useState } from 'react';
import withAuth from './withAuth';
import { FaRegUserCircle, FaHome } from 'react-icons/fa';
import { IoStatsChart } from 'react-icons/io5';
import { useNavigate } from 'react-router';

function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <div className="sticky top-0 bg-olive text-white px-4 py-3 flex justify-between items-center z-[2116]">
      <p className="text-2xl"> Flashcards</p>
        <div className="text-3xl flex justify-center items-center gap-3 relative">

        <FaHome
            aria-label="Home"
            onClick={() => navigate('/')}
            className="cursor-pointer"
          />


          <IoStatsChart
            aria-label="Statistics"
            onClick={() => navigate('/statistics')}
            className="cursor-pointer"
          />

        <div className="relative">
          <FaRegUserCircle
            onClick={handleOpen}
            className="cursor-pointer"
          />

        {open && (
        <ul className="absolute right-0 mt-1 w-48  rounded shadow-lg z-50 ">
            <li>
            <button className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer "
            >
                Change password
            </button>
            </li>
            <li>
            <button className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login');
              }}
            >
                Logout
            </button>
            </li>
        </ul>
        )}

        </div>
      </div>
    </div>
  );
}

const AuthNavbar = withAuth(Navbar);
export default AuthNavbar;
