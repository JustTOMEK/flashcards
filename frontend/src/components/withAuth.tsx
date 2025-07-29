import { useEffect, useState, type ComponentType } from 'react'
import { useNavigate } from 'react-router'

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
    return (props: P) => {
        const [loading, setLoading] = useState(true)
        const navigate = useNavigate()

        useEffect(() => {
            const checkAuth = async () => {
                const token = localStorage.getItem('token')
                const response = await fetch(
                    'http://localhost:3000/authenticate',
                    {
                        method: 'POST',
                        headers: {
                            token: token ?? '',
                        },
                    }
                )

                if (response.ok) {
                    setLoading(false)
                } else {
                    navigate('/login')
                }
            }
            checkAuth()
        }, [navigate])

        if (loading) {
            return ( 
                <div className='h-screen w-screen bg-cream flex justify-center items-center'> 
                    <p className='text-4xl font-bold text-dark-olive'> Loading...</p>
                 </div>
            );
        }
        return <WrappedComponent {...props} />
    }
}

export default withAuth
