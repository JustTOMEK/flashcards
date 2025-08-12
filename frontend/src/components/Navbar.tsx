import { useState } from 'react'
import withAuth from './withAuth'
import { FaRegUserCircle, FaHome } from 'react-icons/fa'
import { IoStatsChart } from 'react-icons/io5'
import { useNavigate } from 'react-router'
import { useTranslation } from 'react-i18next'
import { FaGlobe } from 'react-icons/fa'
import i18n from '../i18'

function Navbar() {
    const navigate = useNavigate()
    const [openMenu, setOpenMenu] = useState(false)
    const [openLang, setOpenLang] = useState(false)
    const { t } = useTranslation()

    return (
        <div
            className="sticky top-0 bg-olive text-white px-4 py-3 flex justify-between items-center z-[2116]"
            data-testid="navbar"
        >
            <p className="text-2xl" data-testid="navbar-title">
                Flashcards
            </p>
            <div
                className="text-3xl flex justify-center items-center gap-3 relative"
                data-testid="navbar-icons"
            >
                <FaHome
                    aria-label="Home"
                    onClick={() => navigate('/')}
                    className="cursor-pointer"
                    data-testid="navbar-home"
                />

                <IoStatsChart
                    aria-label="Statistics"
                    onClick={() => navigate('/statistics')}
                    className="cursor-pointer"
                    data-testid="navbar-statistics"
                />

                <div className="relative" data-testid="navbar-language">
                    <FaGlobe
                        onClick={() => {
                            setOpenLang(!openLang)
                            if (openMenu) setOpenMenu(false)
                        }}
                        className="cursor-pointer"
                        data-testid="language-toggle"
                    />
                    {openLang && (
                        <ul
                            className="absolute right-0 mt-1 w-48 rounded shadow-lg z-50"
                            data-testid="language-menu"
                        >
                            <li>
                                <button
                                    className="bg-cream w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.setItem('lang', 'en')
                                        i18n.changeLanguage('en')
                                    }}
                                    data-testid="lang-en"
                                >
                                    {t('lang_1')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="bg-cream w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.setItem('lang', 'de')
                                        i18n.changeLanguage('de')
                                    }}
                                    data-testid="lang-de"
                                >
                                    {t('lang_2')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="bg-cream w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.setItem('lang', 'pl')
                                        i18n.changeLanguage('pl')
                                    }}
                                    data-testid="lang-pl"
                                >
                                    {t('lang_3')}
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="relative" data-testid="navbar-user">
                    <FaRegUserCircle
                        onClick={() => {
                            setOpenMenu(!openMenu)
                            if (openLang) setOpenLang(false)
                        }}
                        className="cursor-pointer"
                        data-testid="user-toggle"
                    />
                    {openMenu && (
                        <ul
                            className="absolute right-0 mt-1 w-48 rounded shadow-lg z-50"
                            data-testid="user-menu"
                        >
                            <li>
                                <button
                                    className="bg-cream w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        setOpenMenu(false)
                                        navigate('/changePassword')
                                    }}
                                    data-testid="change-password"
                                >
                                    {t('navbar_1')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="bg-cream w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        setOpenMenu(false)
                                        navigate('/login')
                                    }}
                                    data-testid="logout"
                                >
                                    {t('navbar_2')}
                                </button>
                            </li>
                        </ul>
                    )}
                </div>
            </div>
        </div>
    )
}

const AuthNavbar = withAuth(Navbar)
export default AuthNavbar
