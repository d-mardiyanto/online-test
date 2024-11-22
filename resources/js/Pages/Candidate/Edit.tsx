import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

// Define the type for a single candidate
interface Candidate {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    photo?: string; // Optional field
}


interface Result {
    correct: number;
    wrong: number;
    score: number;
    header: [];
    quiz: {
        id: number,
        title: string,
        time_limit: number,
        pass_mark: number,

    };
}
// Define the type for the component props
interface MainProps {
    candidate: Candidate;
    results: Result[];
}

export default function Main({ candidate,results }: MainProps) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profile {candidate.name}
                </h2>
            }
        >
            <Head title="Candidate" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome, Admin! Here are the candidate Profile:
                        </div>
                        <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {Object.entries(results).map(([key, result]) => (
                                <div
                                    key={result.quiz.id}
                                    className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
                                >
                                    <h3 className="text-lg font-medium text-gray-800 text-center">
                                        {result.quiz.title}
                                    </h3>
                                    <p className="text-gray-500 text-sm text-center">
                                        Score : {result.score}
                                    </p>
                                    <p className="text-gray-500 text-sm text-center">
                                        Pass Mark : {result.quiz.pass_mark}
                                    </p>
                                    <p className="text-gray-700 text-sm text-center mt-2">
                                        {result.score < result.quiz.pass_mark ? (
                                            <b>Status : Not Pass</b>
                                        ) : (
                                            <b>Status : Pass</b>
                                        )}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
