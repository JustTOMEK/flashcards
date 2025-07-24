import '../App.css'
import withAuth from './withAuth'

const Translation: React.FC = () => {
    const handleButtonclick = async () => {
        const res = await fetch('http://127.0.0.1:5000/translate', {
            method: 'POST',
            body: JSON.stringify({
                q: 'Witam psy!',
                source: 'pl',
                target: 'de',
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })

        console.log(await res.json())
    }

    return (
        <>
            Jesteśmy Tutaj
            <button
                className="px-4 bg-red-500 rounded"
                onClick={handleButtonclick}
            >
                {' '}
                Przycisk szefa{' '}
            </button>
        </>
    )
}

export default withAuth(Translation)
