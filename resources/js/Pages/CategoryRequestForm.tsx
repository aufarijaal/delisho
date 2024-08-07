import { Head, Link, router, useForm } from "@inertiajs/react";
import React from "react";
import { Button, Input, Textarea } from "react-daisyui";

function CategoryRequestForm({ auth, errors }) {
    const { data, setData, post } = useForm({
        name: "",
        description: "",
    });

    function handleSubmit(e: any) {
        e.preventDefault();

        post("/category-requests/make");
    }

    return (
        <main className="min-h-screen bg-[#f8f6f2] flex flex-col gap-2 items-center justify-center px-4">
            <Head title="Request a category" />

            <form
                className="bg-white p-4 shadow-sm rounded-lg w-full sm:w-[500px] flex flex-col gap-4"
                onSubmit={handleSubmit}
            >
                <div className="mb-2">
                    <h4 className="text-lg font-bold">Request a category</h4>
                </div>

                <ul className="flex flex-col gap-2">
                    {Object.keys(errors).map((key) => (
                        <li className="text-sm text-error">{errors[key]}</li>
                    ))}
                </ul>

                <Input
                    placeholder="Category name"
                    value={data.name}
                    onInput={(e) =>
                        setData({ ...data, name: e.currentTarget.value })
                    }
                    autoFocus
                />

                <Textarea
                    placeholder="Description"
                    value={data.description}
                    onInput={(e) =>
                        setData({ ...data, description: e.currentTarget.value })
                    }
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
            <div>
                <Link href="/category-requests" className="btn btn-link">
                    Browse requested categories
                </Link>
            </div>
        </main>
    );
}

export default CategoryRequestForm;
