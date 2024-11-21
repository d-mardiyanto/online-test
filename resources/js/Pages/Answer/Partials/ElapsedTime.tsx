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

    const [timeLeft, setTimeLeft] = useState<number>(0);

    // Timer logic: Calculate remaining time based on result.start_time
    useEffect(() => {
        if (!result.start_time) {
            console.error("Result start_time is missing");
            return;
        }

        const startTime = new Date(result.start_time).getTime(); // Convert to timestamp
        const endTime = startTime + quiz.time_limit * 60 * 1000; // Add quiz.time_limit in milliseconds

        const interval = setInterval(() => {
            const remainingTime = endTime - Date.now();
            setTimeLeft(remainingTime > 0 ? remainingTime : 0);

            if (remainingTime <= 0) {
                clearInterval(interval); // Stop timer if time runs out
            }
        }, 1000);

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [quiz.time_limit, result.start_time]);

    // Helper function to format time
    const formatTime = (milliseconds:number) => {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = totalSeconds % 60;
        return `${minutes}:${seconds.toString().padStart(2, "0")}`;
    };

    const endQuiz = () => {
        put(route("results.update",result.id), {
            onFinish: () => reset(),
        });
    };

    return (
        <div className="bg-white p-6 rounded shadow">
            <h3 className="text-center text-lg font-medium mb-4">
                Time Left : {timeLeft > 0 ? formatTime(timeLeft) : "Time's up!"}
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

