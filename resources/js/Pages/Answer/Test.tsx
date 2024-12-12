import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';
import StartQuiz from './Partials/StartQuiz';
import ElapsedTime from './Partials/ElapsedTime';

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

interface Results {
    id: number;
    quiz_id:number;
    work_date: string;
    start_time: string;
    end_time: string;
    score: number;
}

interface Answer {
    questions: Questions[];
}
// Define the type for the component props
interface MainProps {
    quiz: Quiz;
    questions: Questions[];
    result:Results;
    answer:Answer;
}

export default function QuestionForm({ quiz, questions, result,answer} : MainProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Test / {quiz.title}
                </h2>
            }
        >
            <Head title="Create Quiz" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <StartQuiz quiz={quiz} questions={questions} answers={answer} result={result} />
                    
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

