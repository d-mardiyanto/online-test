import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Main({ results }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Test Results
                </h2>
            }
        >
            <Head title="Result" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome, Here's your test results
                        </div>
                        <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {results.map((result) => (
                                <div
                                    key={result.id}
                                    className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
                                >
                                    <img
                                        src={result.photo || '/storage/user.png'}
                                        alt={result.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                    />
                                    <h3 className="text-lg font-medium text-gray-800 text-center">
                                        {result.name}
                                    </h3>
                                    <p className="text-gray-600 text-center">
                                        {result.email}
                                    </p>
                                    <p className="text-gray-500 text-sm text-center">
                                        {result.phone}
                                    </p>
                                    <p className="text-gray-700 text-sm text-center mt-2">
                                        Status: {result.status}
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
