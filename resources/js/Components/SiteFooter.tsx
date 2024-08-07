import { Link } from "@inertiajs/react";
import React from "react";
import { Footer } from "react-daisyui";

const SiteFooter = () => {
    return (
        <Footer className="p-10 bg-neutral text-neutral-content">
            <div className="flex gap-10 items-center">
                <div>
                    <img
                        src="/logo.svg"
                        alt="logo"
                        className="w-[80px] h-[80px]"
                    />
                    <div className="text-xl font-bold">Delisho</div>
                </div>

                <div className="max-w-xs">
                    <p>
                        <strong>Delisho</strong> is a website to let people
                        share their food recipes with others. people can make,
                        comment, and save their favorite recipes, and people can
                        even request a category if they don't feel satisfied
                        with the currently available categories.
                    </p>
                </div>
            </div>

            <div>
                <Footer.Title>Navigation</Footer.Title>
                <Link href="/search" className="link link-hover">
                    Search recipes
                </Link>
            </div>

            <div>
                <Footer.Title>Help</Footer.Title>
                <Link
                    href="/category-requests/make"
                    className="link link-hover"
                >
                    Category request
                </Link>
                <Link href="/give-feedback" className="link link-hover">
                    Feedback
                </Link>
            </div>
        </Footer>
    );
};

export default SiteFooter;
