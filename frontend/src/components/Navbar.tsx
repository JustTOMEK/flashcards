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
        <div className="sticky top-0 bg-olive text-white px-4 py-3 flex justify-between items-center z-[2116]">
            <p className="text-2xl"> Flashcards</p>
            <div className="text-3xl flex justify-center items-center gap-3 relative">
                <FaHome
                    aria-label="Home"
                    onClick={() => navigate('/')}
                    className="cursor-pointer"
                />

                <IoStatsChart
                    aria-label="Statistics"
                    onClick={() => navigate('/statistics')}
                    className="cursor-pointer"
                />

                <div className="relative">
                    <FaGlobe
                        onClick={() => {
                            setOpenLang(!openLang)
                            if (openMenu) {
                                setOpenMenu(false)
                            }
                        }}
                        className="cursor-pointer"
                    />
                    {openLang && (
                        <ul className="absolute right-0 mt-1 w-48  rounded shadow-lg z-50 ">
                            <li>
                                <button
                                    className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer "
                                    onClick={() => {
                                        localStorage.setItem('lang', 'en')
                                        i18n.changeLanguage('en')
                                    }}
                                >
                                    {t('lang_1')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.setItem('lang', 'de')
                                        i18n.changeLanguage('de')
                                    }}
                                >
                                    {t('lang_2')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.setItem('lang', 'pl')
                                        i18n.changeLanguage('pl')
                                    }}
                                >
                                    {t('lang_3')}
                                </button>
                            </li>
                        </ul>
                    )}
                </div>

                <div className="relative">
                    <FaRegUserCircle
                        onClick={() => {
                            setOpenMenu(!openMenu)
                            if (openLang) {
                                setOpenLang(false)
                            }
                        }}
                        className="cursor-pointer"
                    />

                    {openMenu && (
                        <ul className="absolute right-0 mt-1 w-48  rounded shadow-lg z-50 ">
                            <li>
                                <button
                                    className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer "
                                    onClick={() => {
                                        setOpenMenu(false)
                                        navigate('/changePassword')
                                    }}
                                >
                                    {t('navbar_1')}
                                </button>
                            </li>
                            <li>
                                <button
                                    className="bg-cream  w-full text-left px-4 py-2 text-olive text-xl cursor-pointer"
                                    onClick={() => {
                                        localStorage.removeItem('token')
                                        setOpenMenu(false)
                                        navigate('/login')
                                    }}
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
