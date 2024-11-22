import PrimaryButton from '@/Components/PrimaryButton';
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, ChangeEvent } from 'react';


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

export default function Edit({ quiz }: MainProps) {
    const { data, setData, patch, processing, errors, reset } = useForm({
        title: quiz.title,
        description: quiz.description,
        start_date: quiz.start_date,
        exp_date: quiz.exp_date,
        time_limit: quiz.time_limit,
        pass_mark: quiz.pass_mark,
        attempt: quiz.attempt,
    });

    const [action, setAction] = useState(""); // Tracks which button was clicked

    type FormFields = "title" | "description" | "start_date" | "exp_date" | "time_limit" | "pass_mark" | "attempt";

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as FormFields, value);
    };


    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        patch(route('quiz.update', quiz.id), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Quizzes / Create Quiz
                </h2>
            }
        >
            <Head title="Create Quiz" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Side: Form */}
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-lg font-medium mb-4">Quiz Details</h3>
                            <form onSubmit={submit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Title*
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={data.title}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Description
                                    </label>
                                    <textarea
                                        name="description"
                                        value={data.description}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                        rows={3}
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Start Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="start_date"
                                        value={data.start_date}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Expiry Date*
                                    </label>
                                    <input
                                        type="date"
                                        name="exp_date"
                                        value={data.exp_date}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Time Limit (minutes)*
                                    </label>
                                    <input
                                        type="number"
                                        name="time_limit"
                                        value={data.time_limit}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Pass Mark*
                                    </label>
                                    <input
                                        type="number"
                                        name="pass_mark"
                                        value={data.pass_mark}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Max Attempts
                                    </label>
                                    <input
                                        type="number"
                                        name="attempt"
                                        value={data.attempt}
                                        onChange={(e) => {
                                            const value = Math.max(1, parseInt(e.target.value, 10) || 1); // Ensure the value is at least 1
                                            setData((prevState) => ({
                                                ...prevState,
                                                attempt: value,
                                            }));
                                        }}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    />
                                </div>
                                <div className="mt-3">
                                    <button
                                        type="submit"
                                        onClick={() => setAction("save")}
                                        className="me-1 px-4 py-2 bg-green-600 text-white rounded hover:bg-blue-700"
                                    >
                                        Update Quiz
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
