import { useForm } from '@inertiajs/react';
import React,{useEffect,useState} from 'react';
interface Questions {
    id: number;
    quiz_id: number;
    order_number: number;
    content: string;
    type: string;
    options: [];
    correct_answer: string;
    [key: string]: any;
}

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

interface Answer {
    questions: Questions[];
}

// Define the type for the component props
interface StartQuizProps {
    quiz: Quiz;
    questions: Questions[];
    answers:Answer;
    result:Result;
}

export default function QuestionsForm({ quiz, questions, result }: StartQuizProps) {
    const { data, setData, post, put, processing, reset } = useForm({
        quiz_id: quiz.id,
        answers: [] as { question_id: number; answer: string | string[] }[],
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
            const now: Date = new Date();
            const diff: number = endDateTime.getTime() - now.getTime();

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

    const handleInputChange = (
        question_id: number,
        value: string,
        type: string,
        checked?: boolean
    ) => {
        setData((prevData) => {
            const updatedAnswers = [...prevData.answers];
            const answerIndex = updatedAnswers.findIndex((ans) => ans.question_id === question_id);

            if (type === 'radio') {
                // Update single-choice answer
                if (answerIndex !== -1) {
                    updatedAnswers[answerIndex].answer = value;
                } else {
                    updatedAnswers.push({ question_id, answer: [value] });
                }
            } else if (type === 'checkbox') {
                // Update multi-choice answer
                if (answerIndex !== -1) {
                    const currentAnswers = updatedAnswers[answerIndex].answer as string[];
                    updatedAnswers[answerIndex].answer = checked
                        ? [...currentAnswers, value]
                        : currentAnswers.filter((ans) => ans !== value);
                } else {
                    updatedAnswers.push({ question_id, answer: [value] });
                }
            }
            return { ...prevData, answers: updatedAnswers };
        });
    };

    const handleSubmit = () =>{
        post(route('answer.store'), {
            data:data,
            onFinish: () => reset(),
        });
    }

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('answer.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left Side: Form */}
            <div className="bg-white p-6 rounded shadow">

                <h3 className="text-lg font-medium mb-4">Questions - {quiz.title}</h3>
                <form onSubmit={submit} className="p-4 bg-white rounded shadow">
                    <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>
                    {questions.map((question) => (
                        <div key={question.id} className="mb-6">
                            <p className="font-medium mb-2">{question.content}</p>
                            {Object.entries(question.options).map(([key, value]) => (
                                <label key={key} className="block mb-1">
                                    <input
                                        type={question.type}
                                        name={`question_${question.id}`}
                                        value={key}
                                        checked={
                                            question.type === 'radio'
                                                ? data.answers.find((ans) => ans.question_id === question.id)?.answer === key
                                                : (data.answers.find((ans) => ans.question_id === question.id)?.answer as string[])?.includes(key)
                                        }
                                        onChange={(e) =>
                                            handleInputChange(
                                                question.id,
                                                key,
                                                question.type,
                                                e.target.checked
                                            )
                                        }
                                    />
                                    -
                                    {value}
                                </label>
                            ))}
                        </div>
                    ))}
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={processing}
                    >
                        Submit
                    </button>
                </form>
            </div>

            {/* Right Side: Accordion */}
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
        </div>
        
    );
}
