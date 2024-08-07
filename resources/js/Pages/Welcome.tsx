import { Link, Head, router } from "@inertiajs/react";
import { PageProps } from "@/types";
import {
    Button,
    Carousel,
    Divider,
    Dropdown,
    Footer,
    Form,
    Input,
    Navbar,
} from "react-daisyui";
import pickRandom from "@/Utils/pick-random";
import { Icon } from "@iconify-icon/react";
import SiteNavbar from "@/Components/SiteNavbar";
import SiteFooter from "@/Components/SiteFooter";
import { useState } from "react";
import RecipeSearchForm from "@/Components/RecipeSearchForm";
import {
    resolveFinalImageUrl,
    resolveProfilePictureUrl,
} from "@/Utils/image-url-resolver";
import humanizeDuration from "humanize-duration";
import dayjs from "dayjs";
import RecipeCard from "@/Components/RecipeCard";

export default function Welcome({
    auth,
    categories,
    greatestRecipes,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    categories: any[];
    greatestRecipes: any;
}>) {
    return (
        <>
            <Head title="Delisho">
                <style>
                    {`
                        body {
                           background-color: #f8f6f2;
                        }
                    `}
                </style>
            </Head>
            <SiteNavbar user={auth.user} />

            <main>
                <section
                    className="flex flex-col h-[700px] justify-center"
                    style={{
                        backgroundImage:
                            "url(https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                        backgroundPosition: "center center",
                        backgroundSize: "cover",
                        backgroundRepeat: "no-repeat",
                        backdropFilter: "blur(12px)",
                    }}
                >
                    <h1 className="bg-clip-text bg-gradient-to-bl from-orange-400 via-orange-500 to-orange-600 text-6xl font-bold text-transparent text-center">
                        Delisho
                    </h1>
                    <h1 className="text-center text-6xl font-bold tracking-tighter text-neutral">
                        Share Deliciousness
                    </h1>
                </section>

                <section className="py-10 px-4">
                    <div className="max-w-4xl mx-auto flex justify-center flex-col items-center gap-5">
                        <h2 className="font-bold text-2xl text-center">
                            Search a recipe
                        </h2>
                        <RecipeSearchForm />
                    </div>
                </section>

                <Divider className="max-w-7xl mx-auto" />

                <section className="py-10 px-4">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-bold text-4xl text-center">
                            Available Categories
                        </h2>

                        <div className="flex mt-10 flex-wrap gap-2 justify-center">
                            {categories.map((c) => (
                                <Link
                                    href={`/categories/${c.slug}`}
                                    key={c.id}
                                    className={`btn btn-sm ${pickRandom([
                                        "btn-primary",
                                        "btn-secondary",
                                        "btn-accent",
                                        "btn-error",
                                        "btn-info",
                                        "btn-warning",
                                        "btn-success",
                                    ])}`}
                                >
                                    {c.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <Divider className="max-w-7xl mx-auto" />

                <section className="py-10">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="font-bold text-3xl sm:text-4xl text-center">
                            Greatest
                        </h2>

                        <div className="flex mt-10">
                            <div className="recipe-card-list flex flex-wrap gap-x-4 gap-y-10 justify-center">
                                {greatestRecipes.map((recipe, i) => (
                                    <RecipeCard data={recipe} />
                                ))}
                            </div>
                            <div></div>
                        </div>
                    </div>
                </section>

                <SiteFooter />
            </main>
        </>
    );
}
