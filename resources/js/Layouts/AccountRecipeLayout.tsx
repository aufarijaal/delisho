import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import {Head, Link, router, usePage} from "@inertiajs/react";
import { Button, Dropdown, Pagination, Skeleton, Tabs } from "react-daisyui";
import RecipeCard from "@/Components/RecipeCard";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";

const AccountRecipeLayout = ({ auth, tab, children, recipes }) => {
    return (
        <DefaultLayout user={auth.user}>
            <Head title={tab === "my" ? "My Recipes" : "Saved Recipes"} />

            <div className="max-w-7xl mx-auto px-2 pb-32 pt-10">
                <h1 className="text-4xl font-extrabold font-serif text-center">
                    {tab === "my" ? "My Recipes" : "Saved Recipes"}
                </h1>

                <div className="bg-white p-2 w-max rounded-md flex gap-2">
                    <Button
                        color={tab === "my" ? "accent" : "ghost"}
                        size="sm"
                        onClick={() => router.get("/account/recipes?tab=my")}
                    >
                        My Recipes
                    </Button>
                    <Button
                        color={tab === "saved" ? "accent" : "ghost"}
                        size="sm"
                        onClick={() => router.get("/account/recipes?tab=saved")}
                    >
                        Saved Recipes
                    </Button>
                </div>

                <div className="mt-6 flex justify-end">
                    <Dropdown end>
                        <Dropdown.Toggle size="sm">
                            Sort by
                            <Icon icon="mdi:chevron-down" width="20" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-52 z-[5] translate-y-2">
                            <Dropdown.Item>Name</Dropdown.Item>
                            <Dropdown.Item>Name descending</Dropdown.Item>
                            <Dropdown.Item>Most saved</Dropdown.Item>
                            <Dropdown.Item>Least saved</Dropdown.Item>
                            <Dropdown.Item>Newest</Dropdown.Item>
                            <Dropdown.Item>Oldest</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="mt-12 flex flex-wrap gap-4 gap-y-10 min-h-screen">
                    {children}
                </div>

                <div className="flex justify-center mt-6">
                    <Pagination>
                        {recipes.links.map((item, i) => (
                            <Link
                                href={item.url + "&tab=" + tab}
                                className={`join-item btn btn-sm ${item.active ? 'btn-active' : ''} ${item.url ? '' : 'btn-disabled'}`}
                                key={i}
                            >
                                {item.label.replace("&laquo;", "").replace("&raquo;", "")}
                            </Link>
                        ))}
                    </Pagination>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default AccountRecipeLayout;
