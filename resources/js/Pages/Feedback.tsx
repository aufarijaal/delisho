import { Head, router, useForm } from "@inertiajs/react";
import React from "react";
import { Button, Input, Textarea } from "react-daisyui";

function Feedback() {
    const { data, setData, post } = useForm({
        body: "",
        rate: 5,
    });
    const emojis = [
        {
            static: "https://fonts.gstatic.com/s/e/notoemoji/latest/2639_fe0f/emoji.svg",
            anim: "https://fonts.gstatic.com/s/e/notoemoji/latest/2639_fe0f/512.webp",
            text: "Terrible",
        },
        {
            static: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae4/emoji.svg",
            anim: "https://fonts.gstatic.com/s/e/notoemoji/latest/1fae4/512.webp",
            text: "Bad",
        },
        {
            static: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/emoji.svg",
            anim: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f610/512.webp",
            text: "Okay",
        },
        {
            static: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f642/emoji.svg",
            anim: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f642/512.webp",
            text: "Good",
        },
        {
            static: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/emoji.svg",
            anim: "https://fonts.gstatic.com/s/e/notoemoji/latest/1f600/512.webp",
            text: "Great",
        },
    ];

    function handleSubmit(e: any) {
        e.preventDefault();

        post("/give-feedback");
    }

    return (
        <main className="min-h-screen bg-[#f8f6f2] grid place-items-center px-4">
            <Head title="Give a feedback" />

            <form
                className="bg-white p-4 shadow-sm rounded-lg w-full sm:w-[500px]"
                onSubmit={handleSubmit}
            >
                <div className="mb-6">
                    <h4 className="text-lg font-bold">Give us a feedback</h4>
                </div>

                <div className="flex gap-6 w-full justify-center py-4">
                    {emojis.map((v, i) => (
                        <label
                            htmlFor={`rate-${i + 1}`}
                            key={i + 1}
                            className="cursor-pointer flex flex-col items-center gap-2"
                        >
                            <input
                                className="peer hidden"
                                hidden
                                type="radio"
                                role="radio"
                                id={`rate-${i + 1}`}
                                name="rate"
                                value={i + 1}
                                defaultChecked={i + 1 === data.rate}
                                onChange={(e) => {
                                    setData({
                                        ...data,
                                        rate: parseInt(e.currentTarget.value),
                                    });
                                }}
                            />
                            <img
                                className="peer-checked:block hidden"
                                width="48"
                                src={v.anim}
                                alt="emot"
                            />
                            <img
                                className="peer-checked:hidden grayscale"
                                width="48"
                                src={v.static}
                                alt="emot"
                            />
                            <div className="text-sm">{v.text}</div>
                        </label>
                    ))}
                </div>

                <Textarea
                    className="w-full"
                    placeholder="Write a feedback"
                    value={data.body}
                    onInput={(e) =>
                        setData({ ...data, body: e.currentTarget.value })
                    }
                    autoFocus
                />

                <div className="mt-4 flex justify-end gap-2">
                    <Button
                        color="ghost"
                        type="button"
                        onClick={() => router.get("/")}
                        size="sm"
                    >
                        Cancel
                    </Button>
                    <Button size="sm" color="accent">
                        Submit
                    </Button>
                </div>
            </form>
        </main>
    );
}

export default Feedback;
