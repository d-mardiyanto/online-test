import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect } from 'react';


export default function MatchInput() {
    const { data, setData, post, processing, errors, reset } = useForm({
        input1: "",
        input2: ""
    });
    // Handle changes for input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('answer.character-match'), {
            onFinish: () => reset(),
        });
    };


    return (
        <form onSubmit={submit}>
            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Input 1
                </label>
                <input
                    type="text"
                    name="input1"
                    value={data.input1}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                    Input 2
                </label>
                <input
                    type="text"
                    name="input2"
                    value={data.input2}
                    onChange={handleInputChange}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                />
            </div>

            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}

