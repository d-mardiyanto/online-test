import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState } from 'react';

export default function QuestionForm({ quiz, questions, session }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quiz_id: quiz.id,
        type: "radio", // Default to single choice
        order_number: "",
        content: "",
        options: [{ text: "" }], // Array to handle multiple options
        correct_answer: [], // Dynamic for radio or checkbox
    });

    // Handle changes for input fields
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle option changes
    const handleOptionChange = (index, value) => {
        const updatedOptions = [...data.options];
        updatedOptions[index].text = value;
        setData((prevState) => ({
            ...prevState,
            options: updatedOptions,
        }));
    };

    // Add a new option
    const addOption = () => {
        setData((prevState) => ({
            ...prevState,
            options: [...prevState.options, { text: "" }],
        }));
    };

    // Remove an option
    const removeOption = (index) => {
        const updatedOptions = data.options.filter((_, i) => i !== index);
        const updatedCorrectAnswer = data.correct_answer.filter(
            (_, i) => i !== index
        );
        setData((prevState) => ({
            ...prevState,
            options: updatedOptions,
            correct_answer: updatedCorrectAnswer,
        }));
    };

    // Handle correct answer selection for radio and checkbox types
    const handleCorrectAnswerChange = (value) => {
        if (data.type === "radio") {
            setData((prevState) => ({
                ...prevState,
                correct_answer: [value],
            }));
        }
    };

    const handleCheckboxAnswerChange = (value) => {
        setData((prevState) => {
            const updatedCorrectAnswer = prevState.correct_answer.includes(value)
                ? prevState.correct_answer.filter((ans) => ans !== value) // Unselect
                : [...prevState.correct_answer, value]; // Select
            return {
                ...prevState,
                correct_answer: updatedCorrectAnswer,
            };
        });
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('questions.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Quizzes / Create Quiz / Add Questions
                </h2>
            }
        >
            <Head title="Create Quiz" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {/* Left Side: Form */}
                        <div className="bg-white p-6 rounded shadow">
                            
                            <h3 className="text-lg font-medium mb-4">Questions - {quiz.title}</h3>
                            <form onSubmit={submit}>
                                {/* Order Number */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Order Number
                                    </label>
                                    <input
                                        type="number"
                                        name="order_number"
                                        value={data.order_number}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                {/* Type */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Question Type
                                    </label>
                                    <select
                                        name="type"
                                        value={data.type}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    >
                                        <option value="radio">Single Choice (Radio Button)</option>
                                        <option value="checkbox">Multiple Choice (Checkbox)</option>
                                    </select>
                                </div>

                                {/* Content */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Question Content
                                    </label>
                                    <textarea
                                        name="content"
                                        value={data.content}
                                        onChange={handleInputChange}
                                        rows="4"
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                </div>

                                {/* Options */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Options
                                    </label>
                                    {data.options.map((option, index) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                value={option.text}
                                                onChange={(e) =>
                                                    handleOptionChange(index, e.target.value)
                                                }
                                                className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
                                                placeholder={`Option ${index + 1}`}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeOption(index)}
                                                className="text-red-500"
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    ))}
                                    <button
                                        type="button"
                                        onClick={addOption}
                                        className="mt-2 text-blue-500"
                                    >
                                        Add Option
                                    </button>
                                </div>

                                {/* Correct Answer */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Correct Answer
                                    </label>
                                    <div>
                                        {data.options.map((option, index) => (
                                            <div key={index} className="flex items-center mb-2">
                                                {data.type === "radio" ? (
                                                    <input
                                                        type="radio"
                                                        name="correct_answer"
                                                        value={option.text}
                                                        checked={
                                                            data.correct_answer.includes(option.text)
                                                        }
                                                        onChange={() =>
                                                            handleCorrectAnswerChange(option.text)
                                                        }
                                                        className="mr-2"
                                                    />
                                                ) : (
                                                    <input
                                                        type="checkbox"
                                                        name="correct_answer"
                                                        value={option.text}
                                                        checked={
                                                            data.correct_answer.includes(option.text)
                                                        }
                                                        onChange={() =>
                                                            handleCheckboxAnswerChange(option.text)
                                                        }
                                                        className="mr-2"
                                                    />
                                                )}
                                                <label>{option.text}</label>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                >
                                    Save Question
                                </button>
                            </form>
                        </div>

                        {/* Right Side: Accordion */}
                        <div className="bg-white p-6 rounded shadow">
                            <h3 className="text-lg font-medium mb-4">Questions</h3>
                            <div className="space-y-4">
                                {questions.map((question, index) => (
                                    <div key={index} className="border border-gray-300 rounded-md">
                                        <button
                                            type="button"
                                            className="w-full text-left px-4 py-2 bg-gray-100 hover:bg-gray-200"
                                            onClick={() => {
                                                const element = document.getElementById(`question-${index}`);
                                                element.classList.toggle('hidden');
                                            }}
                                        >
                                            {question.content}
                                        </button>
                                        <div id={`question-${index}`} className="hidden px-4 py-2">
                                            <p>Type: {question.type}</p>
                                            <p>Order: {question.order_number}</p>
                                            <p>Options: {question.options}</p>
                                            <p>Correct Answer: {question.correct_answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
