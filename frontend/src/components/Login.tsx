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
            const response = await fetch(
                'https://flashcards-backend-2xbz.onrender.com/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ username, password }),
                }
            )
            setUsername('')
            setPassword('')

            const data = await response.json()
            if (response.ok) {
                localStorage.setItem('token', data.token)
                navigate('/')
            } else {
                console.log('Login unsuccessful')
            }
        } catch (error) {
            console.error('Error tu jest: ', error)
        }
    }

    return (
        <div
            className="flex flex-col sm:flex-row h-screen bg-blue-50 text-blue-900"
            data-testid="login-page"
        >
            <div
                className="w-full sm:w-1/2 p-8 flex flex-col justify-center items-center bg-cream shadow-md"
                data-testid="login-right-panel"
            >
                <h2
                    className="text-2xl font-semibold mb-6 text-dark-olive"
                    data-testid="login-title"
                >
                    {t('login')}
                </h2>

                <label
                    className="w-full max-w-sm mb-4"
                    data-testid="username-label"
                >
                    <span className="block mb-1 text-sm font-medium text-dark-olive">
                        {t('username')}
                    </span>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="text-dark-olive w-full p-2 rounded border-dark-olive border-2 focus:outline-none focus:ring-2 focus:ring-dark-olive"
                        data-testid="username-input"
                    />
                </label>

                <label
                    className="w-full max-w-sm mb-6"
                    data-testid="password-label"
                >
                    <span className="block mb-1 text-sm font-medium text-dark-olive">
                        {t('password')}
                    </span>
                    <div className="relative w-full">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-dark-olive w-full p-2 rounded pr-10 border-dark-olive border-2 focus:outline-none focus:ring-2 focus:ring-dark-olive"
                            data-testid="password-input"
                        />
                        <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-olive"
                            data-testid="toggle-password-visibility"
                        >
                            {showPassword ? <FaEyeSlash /> : <FaEye />}
                        </button>
                    </div>
                </label>

                <div
                    className="w-full max-w-sm space-y-4"
                    data-testid="login-buttons"
                >
                    <button
                        onClick={handleLogin}
                        className="w-full bg-burnt-orange hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                        data-testid="submit-login"
                    >
                        {t('login')}
                    </button>

                    <button
                        onClick={() => navigate('/register')}
                        className="w-full bg-burnt-orange hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded transition"
                        data-testid="go-to-register"
                    >
                        {t('login_1')}
                    </button>
                </div>
            </div>
            <div
                className="w-full sm:w-1/2 p-8 bg-dark-olive flex flex-col justify-center items-center"
                data-testid="login-left-panel"
            >
                <div className="space-y-6">
                    <div
                        className="bg-burnt-orange p-6 rounded-lg shadow-md"
                        data-testid="login-card-1"
                    >
                        <h3 className="text-xl mb-2 text-cream">
                            {t('welcome_1')}
                        </h3>
                        <p className="text-base text-cream">{t('welcome_2')}</p>
                    </div>
                    <div
                        className="bg-burnt-orange p-6 rounded-lg shadow-md"
                        data-testid="login-card-2"
                    >
                        <h3 className="text-xl mb-2 text-cream">
                            {t('practice')}
                        </h3>
                        <p className="text-base text-cream">{t('welcome_3')}</p>
                    </div>
                    <div
                        className="bg-burnt-orange p-6 rounded-lg shadow-md"
                        data-testid="login-card-3"
                    >
                        <h3 className="text-xl mb-2 text-cream">
                            {t('welcome_4')}
                        </h3>
                        <p className="text-base text-cream">{t('welcome_5')}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login
