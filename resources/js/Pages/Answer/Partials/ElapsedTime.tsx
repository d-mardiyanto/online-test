import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';


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

interface Result {
    id: number;
    work_date: string;
    start_time: string;
    end_time: string;
    score: number;
}

// Define the type for the component props
interface MainProps {
    quiz: Quiz;
    result:Result;
}
export default function ElapsedTime({ quiz, result } : MainProps) {
    const { data, setData, put, processing, errors, reset } = useForm({
        quiz_id: quiz.id,
        end_time: "",
        score: "",
    });

    const [timeLeft, setTimeLeft] = useState('');

    // Timer logic: Calculate remaining time based on result.start_time
    useEffect(() => {
        const [hours, minutes, seconds] = result.start_time.split(':').map(Number);
        const startDateTime = new Date();
        startDateTime.setHours(hours, minutes, seconds);

        const endDateTime = new Date(startDateTime.getTime() + quiz.time_limit * 60 * 1000);
        const interval = setInterval(() => {
            const now:Date = new Date();
            const diff:number = endDateTime.getTime() - now.getTime();

            if (diff <= 0) {
                clearInterval(interval);
                setTimeLeft('Time is up!');
            } else {
                const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                const secs = Math.floor((diff % (1000 * 60)) / 1000);
                setTimeLeft(`${mins}m ${secs}s`);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [quiz.time_limit, result.start_time]);


    const endQuiz = () => {
        put(route("results.update",result.id), {
            onFinish: () => reset(),
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-center text-lg font-medium mb-4">
                Time Left :   {timeLeft}
            </h3>
            <div className="text-center space-y-4">
                Start Time : {result.start_time} - End Time : {result.end_time}
                <br />
                Time Limit : {quiz.time_limit} Minutes
                <br />
                Pass Mark : {quiz.pass_mark}
            </div>
        </div>
    );
}

