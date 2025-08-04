import withAuth from './withAuth'
import { FaRegUserCircle } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { IoLogOut } from 'react-icons/io5'
import { useNavigate } from 'react-router'

function Navbar() {
    const navigate = useNavigate()
    return (
        <div className="sticky top-0 bg-olive text-white px-4 py-3 flex justify-between items-center z-[2116]">
            <p className="text-2xl">Welcome debilu to Flashcards </p>
            <div className="text-3xl flex justify-center items-center gap-3">
                <IoStatsChart
                    aria-label="Statistics"
                    onClick={() => {
                        navigate('/statistics')
                    }}
                />
                <FaRegUserCircle aria-label="Profile" />
                <p className="text-4xl">
                    <IoLogOut
                        aria-label="Logout"
                        onClick={() => {
                            localStorage.removeItem('token')
                            navigate('/login')
                        }}
                    />
                </p>
            </div>
        </div>
    )
}
export default withAuth(Navbar)
