import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';


interface Users {
    id: number;
    name: string;
    email: string;
    roles:string;
}

// Define the type for the component props
interface LoginProps {
    status?: string;
    canResetPassword: boolean;
    users: Users[];
}

export default function Login({status,canResetPassword,users} : LoginProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="grid sm:grid-cols-[1fr_2fr] grid-cols-1 w-[90%] sm:w-[80%] bg-white shadow-lg rounded-md overflow-hidden mx-auto">
                    {/* Left Panel */}
                    <div className="p-6 sm:p-8 bg-[#FFF5EE]">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#C65D3D] mb-4">Online Test</h1>
                        <p className="text-[#C65D3D] text-base sm:text-lg mb-6 sm:mb-8">Login Screen</p>

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="email" value="Enter Email Here" className="text-[#C65D3D]" />

                                <TextInput
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    className="mt-1 block w-full border border-[#C65D3D] rounded-md focus:ring-[#C65D3D] focus:border-[#C65D3D]"
                                    autoComplete="username"
                                    isFocused={true}
                                    onChange={(e) => setData('email', e.target.value)}
                                />

                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="mb-4">
                                <InputLabel htmlFor="password" value="Enter Password Here" className="text-[#C65D3D]" />

                                <TextInput
                                    id="password"
                                    type="password"
                                    name="password"
                                    value={data.password}
                                    className="mt-1 block w-full border border-[#C65D3D] rounded-md focus:ring-[#C65D3D] focus:border-[#C65D3D]"
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                />

                                <InputError message={errors.password} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-between">
                                <PrimaryButton className="bg-[#C65D3D] text-white py-2 px-4 rounded-md hover:bg-[#A44C31]" disabled={processing}>
                                    Login
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Right Panel */}
                    <div className="p-6 sm:p-8 bg-[#F8CAC2]">
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#9E3221] mb-4">Users List</h1>
                        <p className="text-[#9E3221] text-base sm:text-lg mb-6 sm:mb-8">For Demo Only</p>

                        <div className="border">
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse min-w-full text-sm sm:text-base">
                                    <thead>
                                        <tr>
                                            <th className="border border-black p-2 text-left">Name</th>
                                            <th className="border border-black p-2 text-left">Email</th>
                                            <th className="border border-black p-2 text-left">Role</th>
                                            <th className="border border-black p-2 text-left">Password</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <tr key={user.id}>
                                                <td className="border border-black p-2">{user.name}</td>
                                                <td className="border border-black p-2">{user.email}</td>
                                                <td className="border border-black p-2">{user.roles}</td>
                                                <td className="border border-black p-2">12345678</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </GuestLayout>
    );
}