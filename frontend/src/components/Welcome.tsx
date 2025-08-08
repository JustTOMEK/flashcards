import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router'

function Welcome() {
    const navigate = useNavigate()
    const { t } = useTranslation()

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
            <div className="w-1/2 p-8 bg-cream flex flex-col justify-center items-center">
                <h1 className="text-4xl mb-6 text-dark-olive">
                    {t('welcome_6')}
                </h1>
                <p className="text-lg  text-dark-olive mb-10 text-center">
                    {t('welcome_7')}
                </p>
                <div className="flex space-x-4">
                    <button
                        className="bg-burnt-orange text-cream py-2 px-4 rounded hover:bg-blue-800"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >
                        {t('login')}
                    </button>
                    <button
                        className="bg-burnt-orange text-cream py-2 px-4 rounded hover:bg-blue-800"
                        onClick={() => {
                            navigate('/register')
                        }}
                    >
                        {t('register')}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Welcome
