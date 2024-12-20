import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState,useEffect } from 'react';
import StartTime from './Partials/StartTime';
import MatchInput from './Partials/MatchInput';

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
    content: string;
    type: string;
    options: [];
    correct_answer: [];
}

// Define the type for the component props
interface MainProps {
    quiz: Quiz;
    questions: Questions;
}

export default function QuestionForm({ quiz, questions} : MainProps) {
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
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Side: Form */}
                        <div className="bg-white p-6 rounded shadow">
                            
                            <h3 className="text-lg font-medium mb-4">Questions - {quiz.title}</h3>
                            <MatchInput/>
                        </div>

                        {/* Right Side: Accordion */}
                        <StartTime quiz={quiz} />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}

