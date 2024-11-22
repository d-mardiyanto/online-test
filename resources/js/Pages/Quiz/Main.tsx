import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

interface Quiz {
    id: number;
    title: string;
    start_date: string;
    time_limit: number;
    pass_mark: number;
}

// Define the type for the component props
interface MainProps {
    quizzes: Quiz[];
}


export default function Main({ quizzes } : MainProps) {
    const user = usePage().props.auth.user;
    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const deletePost = (id:string) => {
        destroy(route('quiz.destroy',id), {
            preserveScroll: true,
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Quizzes
                </h2>
            }
        >
            <Head title="Candidate" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome, Admin! Here are the Quizzes
                        </div>
                        <div className="p-6 text-gray-900">
                            {user.roles == 'Administrator' ? (
                                <Link
                                    href={`/quiz/create`}
                                    className="mx-1 inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-blue-700"
                                >
                                    Add Quiz
                                </Link>
                            ) : ''}
                        </div>
                        <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {quizzes.map((quiz) => (
                                <div
                                    key={quiz.id}
                                    className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
                                >
                                    <h3 className="text-lg font-medium text-gray-800 text-center">
                                        {quiz.title}
                                    </h3>
                                    <p className="text-gray-600 text-center">
                                        {quiz.start_date}
                                    </p>
                                    <p className="text-gray-500 text-sm text-center">
                                        {quiz.time_limit}
                                    </p>
                                    <p className="text-gray-700 text-sm text-center mt-2">
                                        Pass Mark: {quiz.pass_mark}
                                    </p>
                                    {/* View Profile Button */}
                                    {user.roles == 'Administrator' ? (
                                        <div className="mt-4 text-center">
                                            <Link
                                                href={`/quiz/${quiz.id}/edit`}
                                                className="me-1 inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-blue-700"
                                            >
                                                Edit
                                            </Link>
                                            <Link
                                                href={`/questions/${quiz.id}/edit`}
                                                className="inline-block px-4 py-2 text-sm font-medium text-white bg-yellow-600 rounded hover:bg-blue-700"
                                            >
                                                Add Questions
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="mt-4 text-center">
                                            <Link
                                                href={`/answer/${quiz.id}/edit`}
                                                className="me-1 inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-blue-700"
                                            >
                                                Start
                                            </Link>
                                        </div>
                                    )}
                                    
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
