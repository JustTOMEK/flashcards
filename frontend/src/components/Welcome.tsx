import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

function Welcome() {
    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <div
            className="flex flex-col sm:flex-row h-screen bg-blue-50 text-blue-900"
            data-testid="welcome-page"
        >
             <div
                className="w-full sm:w-1/2 p-8 bg-cream flex flex-col justify-center items-center"
                data-testid="right-panel"
            >
                <h1 className="text-4xl mb-6 text-dark-olive" data-testid="main-title">
                    {t('welcome_6')}
                </h1>
                <p className="text-lg text-dark-olive mb-10 text-center" data-testid="main-description">
                    {t('welcome_7')}
                </p>
                <div className="flex space-x-4" data-testid="button-group">
                    <button
                        className="bg-burnt-orange text-cream py-2 px-4 rounded hover:bg-blue-800"
                        onClick={() => navigate('/login')}
                        data-testid="login-button"
                    >
                        {t('login')}
                    </button>
                    <button
                        className="bg-burnt-orange text-cream py-2 px-4 rounded hover:bg-blue-800"
                        onClick={() => navigate('/register')}
                        data-testid="register-button"
                    >
                        {t('register')}
                    </button>
                </div>
            </div>
            <div
                className="w-full sm:w-1/2 p-8 bg-dark-olive flex flex-col justify-center items-center"
                data-testid="left-panel"
            >
                <div className="space-y-6">
                    <div
                        className="bg-burnt-orange p-6 rounded-lg shadow-md"
                        data-testid="card-1"
                    >
                        <h3 className="text-xl mb-2 text-cream" data-testid="card-1-title">
                            {t('welcome_1')}
                        </h3>
                        <p className="text-base text-cream" data-testid="card-1-text">
                            {t('welcome_2')}
                        </p>
                    </div>
                    <div
                        className="bg-burnt-orange p-6 rounded-lg shadow-md"
                        data-testid="card-2"
                    >
                        <h3 className="text-xl mb-2 text-cream" data-testid="card-2-title">
                            {t('practice')}
                        </h3>
                        <p className="text-base text-cream" data-testid="card-2-text">
                            {t('welcome_3')}
                        </p>
                    </div>
                    <div
                        className="bg-burnt-orange p-6 rounded-lg shadow-md"
                        data-testid="card-3"
                    >
                        <h3 className="text-xl mb-2 text-cream" data-testid="card-3-title">
                            {t('welcome_4')}
                        </h3>
                        <p className="text-base text-cream" data-testid="card-3-text">
                            {t('welcome_5')}
                        </p>
                    </div>
                </div>
            </div>
           
        </div>
    )
}

export default Welcome
