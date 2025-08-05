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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)
ChartJS.register(ArcElement)


interface DoughnutResponse {
    repetitions: number;
    completed: number;
    notCompleted: number;
  }

interface BarResponse {
    setName: string
    level3Percentage: string
  }
  

function Statistics() {
    const [barResponse, setBarResponse] = useState<BarResponse[]>([])
    const [doughnutResponse, setDougnutResponse] = useState<DoughnutResponse | null>()

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
    })

    const labels = barResponse.map((item) => item.setName)
    const percentages = barResponse.map((item) =>
        parseFloat(item.level3Percentage.replace('%', ''))
    )

    const barData = {
        labels,
        datasets: [
            {
                label: 'Percentage of learned flashcards',
                data: percentages,
                backgroundColor: '#bc6c25',
                borderColor: '#dda15e',
                borderWidth: 1,
            },
        ],
    }

    
    const totalRepetitions = doughnutResponse?.repetitions ?? 0;
    const completedCount = doughnutResponse?.completed ?? 0;
    const notCompletedCount = doughnutResponse?.notCompleted ?? 0;

    console.log(doughnutResponse)
    const doughnutData = {
        labels: ['Completed', 'Not Completed'],
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
            <div className="p-4 text-center">
                <h2 className="text-2xl font-semibold"> Practice Summary</h2>
                <p className="text-lg mt-2">
                    Total Practiced Cards:{' '}
                    <span className="font-bold">{totalRepetitions}</span>
                </p>

                <p className="flex justify-center items-center gap-2">
                    Daily Streak: <span className="font-bold ml-1">5 days</span>{' '}
                    <FaFire className="text-burnt-orange" />
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4">
                <div className="p-4 h-[200px] md:h-[300px]">
                    <Bar
                        data={barData}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>

                <div className="p-4 flex justify-center h-[200px] md:h-[300px]">
                    <Doughnut
                        data={doughnutData}
                        options={{ maintainAspectRatio: false }}
                    />
                </div>
            </div>
        </>
    )
}


const AuthStatistics = withAuth(Statistics);
export default AuthStatistics;
