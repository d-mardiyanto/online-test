import { useForm } from '@inertiajs/react';
import React from 'react';
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

interface Answer {
    questions: Questions[];
}

// Define the type for the component props
interface StartQuizProps {
    quiz: Quiz;
    questions: Questions[];
    answers:Answer;
}

export default function QuestionsForm({ quiz, questions }: StartQuizProps) {
    const { data, setData, post, processing, reset } = useForm({
        quiz_id: quiz.id,
        answers: [] as { question_id: number; answer: string | string[] }[],
    });

    const handleInputChange = (
        question_id: number,
        value: string,
        type: string,
        checked?: boolean
    ) => {
        setData((prevData) => {
            const updatedAnswers = [...prevData.answers];
            const answerIndex = updatedAnswers.findIndex((ans) => ans.question_id === question_id);

            if (type === 'radio') {
                // Update single-choice answer
                if (answerIndex !== -1) {
                    updatedAnswers[answerIndex].answer = value;
                } else {
                    updatedAnswers.push({ question_id, answer: [value] });
                }
            } else if (type === 'checkbox') {
                // Update multi-choice answer
                if (answerIndex !== -1) {
                    const currentAnswers = updatedAnswers[answerIndex].answer as string[];
                    updatedAnswers[answerIndex].answer = checked
                        ? [...currentAnswers, value]
                        : currentAnswers.filter((ans) => ans !== value);
                } else {
                    updatedAnswers.push({ question_id, answer: [value] });
                }
            }
            return { ...prevData, answers: updatedAnswers };
        });
    };

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('answer.store'), {
            onFinish: () => reset(),
        });
    };

    return (
        <form onSubmit={submit} className="p-4 bg-white rounded shadow">
            <h2 className="text-xl font-semibold mb-4">{quiz.title}</h2>
            {questions.map((question) => (
                <div key={question.id} className="mb-6">
                    <p className="font-medium mb-2">{question.content}</p>
                    {Object.entries(question.options).map(([key, value]) => (
                        <label key={key} className="block mb-1">
                            <input
                                type={question.type}
                                name={`question_${question.id}`}
                                value={key}
                                checked={
                                    question.type === 'radio'
                                        ? data.answers.find((ans) => ans.question_id === question.id)?.answer === key
                                        : (data.answers.find((ans) => ans.question_id === question.id)?.answer as string[])?.includes(key)
                                }
                                onChange={(e) =>
                                    handleInputChange(
                                        question.id,
                                        key,
                                        question.type,
                                        e.target.checked
                                    )
                                }
                            />
                             - 
                            {value}
                        </label>
                    ))}
                </div>
            ))}
            <button
                type="submit"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                disabled={processing}
            >
                Submit
            </button>
        </form>
    );
}
