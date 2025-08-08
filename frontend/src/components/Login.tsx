import { useState } from 'react'
import '../App.css'
import { useNavigate } from 'react-router'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const { t } = useTranslation()

    const navigate = useNavigate()

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })
            setUsername('')
            setPassword('')

            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                navigate('/')
            } else {
                console.log('Login unsucessful')
            }
        } catch (error) {
            console.error('Error tu jest: ', error)
        }
    }

    return (
        <div className="flex h-screen bg-blue-50 text-blue-900">
            <div className="w-1/2 p-8 bg-dark-olive flex flex-col justify-center items-center">
                <div className="space-y-6">
                    <div className="bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            {t('welcome_1')}
                        </h3>
                        <p className="text-base text-cream">{t('welcome_2')}</p>
                    </div>
                    <div className="bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            {t('practice')}
                        </h3>
                        <p className="text-base text-cream">{t('welcome_3')}</p>
                    </div>
                    <div className="bg-burnt-orange p-6 rounded-lg shadow-md">
                        <h3 className="text-xl mb-2 text-cream">
                            {t('welcome_4')}
                        </h3>
                        <p className="text-base text-cream">{t('welcome_5')}</p>
                    </div>
                </div>
            </div>
            <div className="w-1/2 p-8 flex flex-col justify-center items-center bg-cream shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-dark-olive">
                    {t('login')}
                </h2>
                <label className="w-full max-w-sm mb-4">
                    <span className="block mb-1 text-sm font-medium text-dark-olive">
                        {t('username')}
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => {
                            const value = e.target.value
                            setUsername(value)
                        }}
                        className="w-full p-2 rounded border-dark-olive border-2  focus:outline-none focus:ring-2 focus:ring-dark-olive"
                    />
                </label>

                <label className="w-full max-w-sm mb-6">
                    <span className="block mb-1 text-sm font-medium text-dark-olive">
                        {t('password')}
                    </span>

                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 rounded pr-10 border-dark-olive border-2 focus:outline-none focus:ring-2 focus:ring-dark-olive"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-olive"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </label>

                <div className="w-full max-w-sm space-y-4">
                    <button
                        onClick={handleLogin}
                        className="w-full bg-burnt-orange hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                    >
                        {t('login')}
                    </button>

                    <button
                        onClick={() => {
                            navigate('/register')
                        }}
                        className="w-full bg-burnt-orange hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                    >
                        {t('login_1')}
                    </button>
                </div>
            </div>
        </div>
    )
}
export default Login
