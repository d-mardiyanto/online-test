import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

export default function Register() {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Register" />
            <div className="flex items-center justify-center min-h-screen bg-gray-100">
                <div className="grid sm:grid-cols-[1fr_2fr] grid-cols-1 w-[90%] sm:w-[80%] bg-white shadow-lg rounded-md overflow-hidden mx-auto">
                    {/* Left Panel */}
                    <div className="p-8 bg-[#FFF5EE]">
                        <h1 className="text-4xl font-bold text-[#C65D3D] mb-4">Online Test</h1>
                        <p className="text-[#C65D3D] text-lg mb-8">Registration Screen</p>

                        <form onSubmit={submit}>
                            <div className="mb-4">
                                <InputLabel htmlFor="name" value="Enter Email Here" className="text-[#C65D3D]" />

                                <TextInput
                                    id="name"
                                    name="name"
                                    value={data.name}
                                    className="mt-1 block w-full border border-[#C65D3D] rounded-md focus:ring-[#C65D3D] focus:border-[#C65D3D]"
                                    autoComplete="name"
                                    isFocused={true}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />

                                <InputError message={errors.name} className="mt-2" />
                            </div>

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

                            <div className="mb-4">
                                <InputLabel
                                    htmlFor="password_confirmation"
                                    value="Confirm Password"
                                />

                                <TextInput
                                    id="password_confirmation"
                                    type="password"
                                    name="password_confirmation"
                                    value={data.password_confirmation}
                                    className="mt-1 block w-full border border-[#C65D3D] rounded-md focus:ring-[#C65D3D] focus:border-[#C65D3D]"
                                    autoComplete="new-password"
                                    onChange={(e) =>
                                        setData('password_confirmation', e.target.value)
                                    }
                                    required
                                />

                                <InputError
                                    message={errors.password_confirmation}
                                    className="mt-2"
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <Link
                                    href={route('login')}
                                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Already registered?
                                </Link>

                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Register
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>

                    {/* Right Panel */}
                    <div className="p-8 bg-[#F8CAC2]">
                        <h1 className="text-4xl font-bold text-[#9E3221] mb-4">Join Us</h1>
                        <p className="text-[#9E3221] text-lg mb-8">For Demo Only</p>

                        <div className="border border-black">
                            
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}
