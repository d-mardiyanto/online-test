import { PageProps } from '@/types';
import { Head, Link } from '@inertiajs/react';

export default function Welcome({
    auth,
    laravelVersion,
    phpVersion,
}: PageProps<{ laravelVersion: string; phpVersion: string }>) {
    const handleImageError = () => {
        document
            .getElementById('screenshot-container')
            ?.classList.add('!hidden');
        document.getElementById('docs-card')?.classList.add('!row-span-1');
        document
            .getElementById('docs-card-content')
            ?.classList.add('!flex-row');
        document.getElementById('background')?.classList.add('!hidden');
    };

    return (
        <>
            <Head title="Welcome" />
            <div
                className="flex items-center justify-between bg-cover bg-center h-screen px-10"
                style={{
                    backgroundImage: 'url(/assets/bg.png)',
                }}
            >
                <div className="text-left max-w-lg">
                    <h1 className="text-5xl font-bold text-blue-800">ONLINE RECRUITMENT</h1>
                    <div className="flex gap-4 mt-6">
                        {auth.user ? (
                            <Link
                                href={route('dashboard')}
                                className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600"
                            >
                                Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    href={route('login')}
                                    className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href={route('register')}
                                    className="bg-orange-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-orange-600"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                        <a
                            target='_blank'
                            href={"https://github.com/d-mardiyanto/online-test"}
                            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-green-600"
                        >
                            Github
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}
