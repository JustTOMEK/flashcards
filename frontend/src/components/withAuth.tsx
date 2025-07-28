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
            return <> Loading</>
        }
        return <WrappedComponent {...props} />
    }
}

export default withAuth
