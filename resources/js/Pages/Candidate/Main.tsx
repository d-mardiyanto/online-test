import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link } from '@inertiajs/react';

export default function Main({ candidates }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Candidates
                </h2>
            }
        >
            <Head title="Candidate" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            Welcome, Admin! Here are the candidates:
                        </div>
                        <div className="p-4 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                            {candidates.map((candidate) => (
                                <div
                                    key={candidate.id}
                                    className="p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
                                >
                                    <img
                                        src={candidate.photo || '/storage/user.png'}
                                        alt={candidate.name}
                                        className="w-24 h-24 rounded-full mx-auto mb-4"
                                    />
                                    <h3 className="text-lg font-medium text-gray-800 text-center">
                                        {candidate.name}
                                    </h3>
                                    <p className="text-gray-600 text-center">
                                        {candidate.email}
                                    </p>
                                    <p className="text-gray-500 text-sm text-center">
                                        {candidate.phone}
                                    </p>
                                    <p className="text-gray-700 text-sm text-center mt-2">
                                        Status: {candidate.status}
                                    </p>
                                    {/* View Profile Button */}
                                    <div className="mt-4 text-center">
                                        <Link
                                            href={`/candidates/${candidate.id}`}
                                            className="mx-1 inline-block px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={`/candidates/${candidate.id}`}
                                            className="mx-1 inline-block px-4 py-2 text-sm font-medium text-white bg-green-600 rounded hover:bg-blue-700"
                                        >
                                            Create Account
                                        </Link>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}