import { useNavigate } from 'react-router'
import '../App.css'

function Logout(){

    const navigate = useNavigate();
    
    const handleLogout = () => {
        localStorage.removeItem('token')
        navigate('/login')
    }

    return (
        <button  className="bg-green-500"onClick={handleLogout}>
        Logout
        </button>
    )
}

export default Logout