import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler, useState, useEffect, ChangeEvent } from 'react';


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
    quiz_id: number;
    order_number: number;
    content: string;
    type: string;
    options: [];
    correct_answer: string;
    [key: string]: any;
}

// Define the type for the component props
interface StartQuizProps {
    quiz: Quiz;
    questions: Questions[];
}

export default function StartQuiz({quiz,questions} : StartQuizProps) {
    const { data, setData, post, processing, errors, reset } = useForm({
        quiz_id: quiz.id,
        question_id: "", // Default to single choice
        answer: "",
    });
    
    type FormFields = "question_id" | "answer";

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setData(name as FormFields, value);
    };

    // const handleCorrectAnswerChange = (value) => {
    //     setData((prevState) => ({
    //         ...prevState,
    //         correct_answer: [value],
    //     }));
    // };

    // const handleCheckboxAnswerChange = (value) => {
    //     setData((prevState) => {
    //         const updatedCorrectAnswer = prevState.answer.includes(value)
    //             ? prevState.answer.filter((ans) => ans !== value) // Unselect
    //             : [...prevState.answer, value]; // Select
    //         return {
    //             ...prevState,
    //             correct_answer: updatedCorrectAnswer,
    //         };
    //     });
    // };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();

        post(route('answer.store'), {
            onFinish: () => reset(),
        });
    };


    return (
        <form onSubmit={submit}>
            {questions.map((question) => {
                    console.log(question.options);
                    const options = question.options;
                    return(
                        <div
                            key={question.id}
                            className="mt-3 p-4 bg-gray-100 border border-gray-300 rounded-lg shadow"
                        >
                            <p className="font-medium text-gray-800">
                                {question.order_number}. {question.content}
                            </p>
                            <input type="hidden" name="question_id" value={question.id} onChange={handleInputChange}/>
                            {Object.entries(options).map(([key, value]) => (
                                <div key={key} className="flex items-center mb-2">
                                    {question.type === "radio" ? (
                                        <input
                                            type="radio"
                                            name={`answer_${question.id}`}
                                            value={value}
                                            checked={data.answer.includes(value)}
                                            className="mr-2"
                                        />
                                    ) : (
                                        <input
                                            type="checkbox"
                                            name={`answer_${question.id}`}
                                            value={value}
                                            checked={data.answer.includes(value)}
                                            className="mr-2"
                                        />
                                    )}
                                    <label>{`${key}: ${value}`}</label>
                                </div>
                            ))}
                        </div>
                    )
                }
            )}
            <button
                type="submit"
                className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
                Submit
            </button>
        </form>
    );
}

