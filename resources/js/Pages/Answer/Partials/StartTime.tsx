import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef,useState, useEffect } from 'react';

export default function StartTime({ quiz }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quiz_id: quiz.id,
        work_date: "", // Default to single choice
        start_time: "",
        end_time: "",
        score: "",
    });
    const [timeLeft, setTimeLeft] = useState(null);
    // Initialize time left based on quiz expiration date and time limit
    // Timer logic: Calculate remaining time based on quiz.time_limit
    useEffect(() => {
        const endTime = Date.now() + quiz.time_limit * 60 * 1000; // Dynamic: quiz.time_limit in minutes

        const interval = setInterval(() => {
            const remainingTime = endTime - Date.now();
            setTimeLeft(remainingTime > 0 ? remainingTime : 0);
            if (remainingTime <= 0) {
                clearInterval(interval); // Stop timer if time runs out
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [quiz.time_limit]);

    // Helper function to format time
    const formatTime = (milliseconds) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const startQuiz: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('results.store'), {
            onFinish: () => reset(),
        });
    };

    return (

        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-lg font-medium mb-4">Time Left : {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}</h3>
            <div className="text-center space-y-4">
                Start Date : {quiz.start_date} - End Date :{quiz.exp_date} <br></br>
                <br></br>
                Time Limit : {quiz.time_limit} Minutes <br></br>
                Pass Mark : {quiz.pass_mark}
            </div>
            <form onSubmit={startQuiz}>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mt-3"
                >
                    Start Test
                </button>
            </form>
        </div>
    );
}
