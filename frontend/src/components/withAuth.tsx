import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

const withAuth = (WrappedComponent) =>{
    return (props) => {
        const [loading, setLoading] = useState(true);
        const navigate = useNavigate();

        useEffect(() => {
            const checkAuth = async () => {
                const token = localStorage.getItem('token')
                console.log("Tu jestes i masz taki ", token)
                const response = await fetch("http://localhost:3000/authenticate", {
                    method: "POST",
                    headers: {
                        "token": token ?? "",
                    }
                })

                if (response.ok){
                    console.log('Ma token')
                    console.log('Token: ', token)
                    setLoading(false);
                }
                else{
                    console.log('Nie ma tokena')
                    navigate ("/login");
                }


                }
            checkAuth();
            }, [navigate])
        
        if (loading){
            return <> Loading</>;
        }
        return <WrappedComponent {...props} />;
    }
}

export default withAuth;