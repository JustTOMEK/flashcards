import { useEffect, useState } from 'react'
import { Bar, Doughnut } from 'react-chartjs-2'
import { FaFire } from 'react-icons/fa'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
} from 'chart.js'
import withAuth from './withAuth'
import { useTranslation } from 'react-i18next'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.register(ArcElement)

interface DoughnutResponse {
    repetitions: number
    completed: number
    notCompleted: number
    dailyStreak: number
}

interface BarResponse {
    setName: string
    level3Percentage: string
}

function Statistics() {
    const [barResponse, setBarResponse] = useState<BarResponse[]>([])
    const [doughnutResponse, setDougnutResponse] = useState<DoughnutResponse | null>(null)
    const { t } = useTranslation()

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch(`http://localhost:3000/statistics/percentage`, {
            headers: {
                token: token ?? '',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setBarResponse(data)
            })

        fetch(`http://localhost:3000/statistics/completed`, {
            headers: {
                token: token ?? '',
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setDougnutResponse(data)
            })
    }, [])

    const labels = barResponse.map((item) => item.setName)
    const percentages = barResponse.map((item) =>
        parseFloat(item.level3Percentage.replace('%', ''))
    )

    const barData = {
        labels,
        datasets: [
            {
                label: t('statistics_4'),
                data: percentages,
                backgroundColor: '#606c38',
                borderColor: '#dda15e',
                borderWidth: 1,
            },
        ],
    }

    const dailyStreak = doughnutResponse?.dailyStreak ?? 0
    const totalRepetitions = doughnutResponse?.repetitions ?? 0
    const completedCount = doughnutResponse?.completed ?? 0
    const notCompletedCount = doughnutResponse?.notCompleted ?? 0

    const doughnutData = {
        labels: [t('completed'), t('not_completed')],
        datasets: [
            {
                data: [completedCount, notCompletedCount],
                backgroundColor: ['#606c38', '#bc6c25'],
                borderColor: ['#283618', '#dda15e'],
                borderWidth: 1,
            },
        ],
    }

    return (
        <>
            <div className="p-4 text-center" data-testid="statistics-header">
                <h2 className="text-2xl font-semibold" data-testid="statistics-title">
                    {t('statistics_1')}
                </h2>
                <p className="text-lg mt-2" data-testid="total-repetitions">
                    {t('statistics_2')}{' '}
                    <span className="font-bold">{totalRepetitions}</span>
                </p>

                <p className="flex justify-center items-center gap-2" data-testid="daily-streak">
                    {t('statistics_3')}
                    <span className="font-bold ml-1">
                        {dailyStreak} {t('days')}
                    </span>
                    <FaFire className="text-burnt-orange" />
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4" data-testid="charts-container">
                <div className="p-4 h-[200px] md:h-[300px]" data-testid="bar-chart">
                    <Bar data={barData} options={{ maintainAspectRatio: false }} />
                </div>

                <div className="p-4 flex justify-center h-[200px] md:h-[300px]" data-testid="doughnut-chart">
                    <Doughnut data={doughnutData} options={{ maintainAspectRatio: false }} />
                </div>
            </div>
        </>
    )
}

const AuthStatistics = withAuth(Statistics)
export default AuthStatistics
