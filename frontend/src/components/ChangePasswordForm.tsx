import { useState } from 'react'
import { useNavigate } from 'react-router'
import withAuth from './withAuth'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

function ChangePasswordForm() {
    const [currentPassword, setCurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')
    const [showCurrentPassword, setShowCurrentPassword] = useState(false)
    const [showNewPassword, setShowNewPassword] = useState(false)

    const navigate = useNavigate()

    const token = localStorage.getItem('token')

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setSuccess('')
        console.log(token)

        const response = await fetch(
            'https://flashcards-backend-fl4p.onrender.com/change-password',
            {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    token: token ?? '',
                },
                body: JSON.stringify({
                    currentPassword,
                    newPassword,
                }),
            }
        )

        if (response.ok) {
            setSuccess('Password changed successfully!')
            setTimeout(() => navigate('/'), 2000)
        } else {
            const data = await response.json()
            setError(data.message || 'Failed to change password.')
        }
    }
    const { t } = useTranslation()

    return (
        <div className="h-full bg-cream flex justify-center items-center">
            <form
                onSubmit={handleSubmit}
                className="bg-tan p-6 rounded-xl shadow-lg w-full max-w-md space-y-4"
            >
                <div className="relative">
                    <input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder={t('change_password_1')}
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-cream text-dark-olive focus:outline-none focus:ring-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                        }
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-olive"
                    >
                        {showCurrentPassword ? (
                            <FaEyeSlash className="text-dark-olive" />
                        ) : (
                            <FaEye className="text-dark-olive" />
                        )}
                    </button>
                </div>

                <div className="relative">
                    <input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder={t('change_password_2')}
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        className="w-full px-4 py-2 rounded bg-cream text-dark-olive focus:outline-none focus:ring-2 pr-10"
                        required
                    />
                    <button
                        type="button"
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-dark-olive"
                    >
                        {showNewPassword ? (
                            <FaEyeSlash className="text-dark-olive" />
                        ) : (
                            <FaEye className="text-dark-olive" />
                        )}
                    </button>
                </div>

                {error && <p className="text-burnt-orange">{error}</p>}
                {success && <p className="text-olive">{success}</p>}

                <button
                    type="submit"
                    className="w-full bg-olive text-cream py-2 rounded hover:bg-olive transition"
                >
                    {t('change_password_3')}
                </button>
            </form>
        </div>
    )
}

const AuthChangePasswordForm = withAuth(ChangePasswordForm)
export default AuthChangePasswordForm
