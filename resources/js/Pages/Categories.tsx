import RecipeCard from "@/Components/RecipeCard";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";
import { Pagination, Button, Dropdown, Skeleton } from "react-daisyui";
import JsonViewer from "@andypf/json-viewer/dist/esm/react/JsonViewer";

const CategoriesPage = ({ auth, recipes, category, sortBy }: any) => {
    const [initialLoading, setInitialLoading] = useState(false);

    return (
        <DefaultLayout user={auth.user}>
            <Head title={category.name} />

            <div className="max-w-7xl mx-auto px-2 pb-32 pt-10">
                <h1 className="text-4xl font-extrabold font-serif text-center">
                    {category.name}
                </h1>

                <div className="mt-6 flex justify-end">
                    <Dropdown end>
                        <Dropdown.Toggle size="sm">
                            Sort by
                            <Icon icon="mdi:chevron-down" width="20" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-52 z-[5] translate-y-2">
                            <Dropdown.Item
                                className={`${
                                    sortBy === "newest" || !sortBy
                                        ? "active"
                                        : ""
                                }`}
                                onClick={() => {
                                    router.get(`/categories/${category.slug}`, {
                                        sortBy: "newest",
                                    });
                                }}
                            >
                                Newest
                            </Dropdown.Item>
                            <Dropdown.Item
                                className={`${
                                    sortBy === "oldest" ? "active" : ""
                                }`}
                                onClick={() => {
                                    router.get(`/categories/${category.slug}`, {
                                        sortBy: "oldest",
                                    });
                                }}
                            >
                                Oldest
                            </Dropdown.Item>
                            {/* <Dropdown.Item
                                className={`${
                                    sortBy === "mostsaved" ? "active" : ""
                                }`}
                                onClick={() => {
                                    router.get(`/categories/${category.slug}`, {
                                        sortBy: "mostsaved",
                                    });
                                }}
                            >
                                Most saved
                            </Dropdown.Item> */}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                {/* <JsonViewer data={category} theme="darktooth" /> */}

                <div className="min-h-screen mt-12 flex flex-wrap justify-center gap-4 gap-y-8">
                    {category.recipes &&
                    !category.recipes.length &&
                    !initialLoading ? (
                        <div className="text-center text-zinc-500 text-lg mt-6">
                            No recipes with category {category.name}
                        </div>
                    ) : null}

                    {initialLoading
                        ? Array.from({ length: 20 }, (v, i) => (
                              <Skeleton
                                  className="w-[250px] h-[300px]"
                                  key={i}
                              />
                          ))
                        : null}

                    {recipes.data && recipes.data.length > 0 && !initialLoading
                        ? recipes.data.map((recipe) => (
                              <RecipeCard data={recipe} key={recipe.id} />
                          ))
                        : null}
                </div>

                <div className="flex justify-center mt-6">
                    <Pagination>
                        {recipes.links.map((item, i) => (
                            <Link
                                href={item.url}
                                className={`join-item btn btn-sm ${
                                    item.active ? "btn-active" : ""
                                } ${item.url ? "" : "btn-disabled"}`}
                                key={i}
                            >
                                {item.label
                                    .replace("&laquo;", "")
                                    .replace("&raquo;", "")}
                            </Link>
                        ))}
                    </Pagination>
                </div>
            </div>
        </DefaultLayout>
    );
};

export default CategoriesPage;
