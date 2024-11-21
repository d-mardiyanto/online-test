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

// Define the type for the component props
interface MainProps {
    candidate: Candidate;
}

export default function Main({ candidate }: MainProps) {
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
                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
