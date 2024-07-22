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
import {useState} from "react";
import RecipeSearchForm from "@/Components/RecipeSearchForm";

const FeedCard: React.FC<{
    data: {
        createdAt: string;
        title: string;
        excerpt: string;
        image: string;
        author: {
            image?: string;
            name: string;
        };
    };
    href: string;
}> = ({ data, href }) => {
    return (
        <div className="recipe-card flex flex-col sm:flex-row gap-4 p-4 bg-white shadow-sm">
            <img
                src={data.image}
                alt="recipe image"
                className="sm:w-[200px] sm:h-[200px] w-full h-[300px] object-cover"
            />
            <div className="flex flex-col justify-between px-4 sm:px-0 gap-6 sm:gap-0">
                <div className="flex items-center justify-between">
                    <small>{data.createdAt}</small>
                    <button className="text-accent">
                        <Icon icon="mdi:bookmark-outline" width="24" />
                        {/* <Icon icon="mdi:bookmark" width="24" /> */}
                    </button>
                </div>
                <h6 className="text-2xl font-bold font-serif tracking-wider">
                    {data.title}
                </h6>
                <p className="line-clamp-3">{data.excerpt}</p>
                <div className="flex items-center gap-2 text-sm">
                    <img
                        src={data.author.image}
                        alt="author-image"
                        className="w-6 h-6 rounded-full"
                    />
                    <span className="font-semibold">{data.author.name}</span>
                </div>
                <Link className="text-accent font-bold link-hover" href={href}>
                    Continue reading
                </Link>
            </div>
        </div>
    );
};

export default function Welcome({
    auth,
    categories,
}: PageProps<{
    laravelVersion: string;
    phpVersion: string;
    categories: any[];
}>) {
    return (
        <>
            <Head title="Welcome">
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
                        <RecipeSearchForm/>
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
                                    className={`btn btn-sm ${pickRandom(
                                        [
                                            'btn-primary',
                                            'btn-secondary',
                                            'btn-accent',
                                            'btn-error',
                                            'btn-info',
                                            'btn-warning',
                                            'btn-success'
                                        ]
                                    )}`}
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
                            <div className="recipe-card-list flex flex-col gap-10">
                                {Array.from({ length: 2 }, (v, i) => (
                                    <FeedCard
                                        data={{
                                            image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
                                            title: "Nasi Goreng",
                                            createdAt: "Jule 2, 2024",
                                            excerpt:
                                                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab tempore magnam ratione inventore tempora rem animi, numquam reprehenderit maxime beatae. Excepturi, modi eaque distinctio obcaecati iste dolorum fugit vitae sunt!",
                                            author: {
                                                image: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/54.jpg",
                                                name: "John Doe",
                                            },
                                        }}
                                        href="#"
                                    />
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
