import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
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

interface Questions {
    id: number;
    quiz_id:number;
    order_number:number;
    content: string;
    type: string;
    options: [];
    correct_answer:string;
    [key: string]: any;
}

// Define the type for the component props
interface MainProps {
    quiz: Quiz;
    questions:Questions[];
}

interface CustomPageProps {
    errors: Record<string, string>;
    flash?: { success?: string }; 
}

interface FormState {
    quiz_id: number;
    type: string;
    order_number: string;
    content: string;
    options: Record<string, string>; // Explicitly define options as an object with string keys and values
    correct_answer: string;
}

export default function QuestionForm({ quiz, questions } : MainProps) {
    const { errors,flash } = usePage().props as CustomPageProps;
    
    const { data, setData, post, processing, reset } = useForm<FormState>({
        quiz_id: quiz.id,
        type: "radio", // Default to single choice
        order_number: "",
        content: "",
        options: {}, // Array to handle multiple options
        correct_answer: "", // Dynamic for radio or checkbox
    });

    // Generate letters (A, B, C, ...)
    const getLetter = (index: number) => String.fromCharCode(65 + index);

    // Handle changes for input fields
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    // Handle option changes
    const handleOptionChange = (key: string, value: string) => {
        setData((prevState) => ({
            ...prevState,
            options: {
                ...prevState.options,
                [key]: value,
            },
        }));
    };

    // Add a new option
    const addOption = () => {
        const nextKey = getLetter(Object.keys(data.options).length); 
        setData((prevState) => ({
            ...prevState,
            options: {...prevState.options, [nextKey]:''},
        }));
    };

    // Remove an option
    const removeOption = (key: string) => {
        const updatedOptions = { ...data.options };
        delete updatedOptions[key]; // Remove the specified key
        setData((prevState) => ({
            ...prevState,
            options: updatedOptions, // Update options without the removed key
        }));
    };

    const handleCorrectAnswerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setData((prevState:any) => ({
            ...prevState,
            correct_answer: [e.target.value], // Always a single-item array
        }));
    };

    const handleCheckboxAnswerChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setData((prevState:any) => {
            const updatedCorrectAnswer = prevState.correct_answer.includes(e.target.value)
                ? prevState.correct_answer.filter((ans:string) => ans !== e.target.value) // Unselect
                : [...prevState.correct_answer, e.target.value]; // Select
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
                            {flash?.success && (
                                <div className="alert alert-success">
                                    {flash.success}
                                </div>
                            )}
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
                                    {errors.order_number && <div className="text-red-500">{errors.order_number[0]}</div>}
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
                                    {errors.type && <div className="text-red-500">{errors.type[0]}</div>}
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
                                        rows={4}
                                        className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    />
                                    {errors.content && <div className="text-red-500">{errors.content[0]}</div>}
                                </div>

                                {/* Options */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700">
                                        Options
                                    </label>
                                    {Object.entries(data.options).map(([index, value]) => (
                                        <div key={index} className="flex items-center mb-2">
                                            <input
                                                type="text"
                                                value={value}
                                                onChange={(e) =>
                                                    handleOptionChange(index, e.target.value)
                                                }
                                                className="flex-grow border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
                                                placeholder={`Option ${index}`}
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
                                        {Object.entries(data.options).map(([index, value]) => (
                                            <div key={index} className="flex items-center mb-2">
                                                {data.type === "radio" ? (
                                                    <input
                                                        type="radio"
                                                        name="correct_answer"
                                                        value={value}
                                                        className="mr-2"
                                                        onChange={handleCorrectAnswerChange}
                                                    />
                                                ) : (
                                                    <input
                                                        type="checkbox"
                                                        name="correct_answer"
                                                        value={value}
                                                        className="mr-2"
                                                        onChange={handleCheckboxAnswerChange}
                                                    />
                                                )}
                                                <label>{`${index}: ${value}`}</label>
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
                                {questions.map((question) => {
                                    console.log(question.options);
                                    const options = question.options;
                                    return (
                                            <div
                                                key={question.id}
                                                className="mt-3 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
                                            >
                                                <p className="font-medium text-gray-800">
                                                    {question.order_number}. {question.content}
                                                </p>
                                                <input type="hidden" name="question_id" value={question.id} onChange={handleInputChange} />
                                                {Object.entries(options).map(([key, value]) => (
                                                    <div key={key} className="flex items-center mb-2">
                                                        {question.type === "radio" ? (
                                                            <input
                                                                type="radio"
                                                                name={`answer_${question.id}`}
                                                                value={value}
                                                                className="mr-2"
                                                            />
                                                        ) : (
                                                            <input
                                                                type="checkbox"
                                                                name={`answer_${question.id}`}
                                                                value={value}
                                                                className="mr-2"
                                                            />
                                                        )}
                                                        <label>{`${key}: ${value}`}</label>
                                                    </div>
                                                ))}
                                                <p className="font-small text-gray-800">
                                                    Correct Answer : 
                                                    {question.correct_answer}
                                                </p>
                                            </div>
                                        )
                                    }
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
