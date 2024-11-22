import { useForm } from '@inertiajs/react';
import { FormEventHandler, useRef,useState, useEffect } from 'react';


interface Quiz {
    id: number;
    title: string;
    description: string;
    start_date: string;
    exp_date: string;
    time_limit: number;
    pass_mark: number;
    attempt: number;
}

// Define the type for the component props
interface MainProps {
    quiz: Quiz;
}

export default function StartTime({ quiz } : MainProps) {
    // Get current date and time
    const now = new Date();
    const currentDate = now.toISOString().split('T')[0]; // YYYY-MM-DD format
    const currentTime = now.toTimeString().split(' ')[0]; // HH:MM:SS format

    const { data, setData, post, processing, errors, reset } = useForm({
        quiz_id: quiz.id,
        work_date: currentDate, // Current date
        start_time: currentTime, // Current time
        end_time: "",
        score: "",
    });

    const startQuiz: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('results.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <div className="text-center space-y-4">
                Start Date : {quiz.start_date} - End Date :{quiz.exp_date} <br></br>
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
