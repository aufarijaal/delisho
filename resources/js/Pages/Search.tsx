import RecipeCard from "@/Components/RecipeCard";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Dropdown, Skeleton, Pagination, Button, Card } from "react-daisyui";
import React, { useState } from "react";
import JsonViewer from "@andypf/json-viewer/dist/esm/react/JsonViewer";
import RecipeSearchForm from "@/Components/RecipeSearchForm";
import { Link, router } from "@inertiajs/react";

const SearchPage = ({ auth, recipes, q, sortBy }) => {
    const [initialLoading, setInitialLoading] = useState(false);

    return (
        <DefaultLayout user={auth.user}>
            <div className="max-w-7xl mx-auto px-2 pb-32 pt-10">
                {q ? (
                    <>
                        <h1 className="text-center text-zinc-500">
                            Search result for
                        </h1>
                        <h1 className="text-4xl font-extrabold font-serif text-center mt-2">
                            {q}
                        </h1>
                    </>
                ) : (
                    <h1 className="text-center font-serif font-extrabold text-4xl">
                        Search
                    </h1>
                )}

                {/* <JsonViewer data={recipes} /> */}

                <div className="my-6 ">
                    <RecipeSearchForm className="" size="sm" />
                </div>

                <div className="mt-6 flex justify-end">
                    <Dropdown end>
                        <Dropdown.Toggle size="sm" color="accent">
                            Filter
                            <Icon icon="mdi:filter-outline" width="20" />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="w-72 z-[5] translate-y-2 rounded-md p-4">
                            <div>
                                <div>
                                    <h5 className="font-bold">Sort by</h5>
                                    <div className="mt-2 flex gap-1 [&>button]:flex-1">
                                        <Button
                                            size="sm"
                                            color="accent"
                                            variant="outline"
                                            active={
                                                sortBy === "newest" || !sortBy
                                            }
                                            onClick={() => {
                                                router.get(`/search`, {
                                                    sortBy: "newest",
                                                });
                                            }}
                                        >
                                            Newest
                                        </Button>
                                        <Button
                                            size="sm"
                                            color="accent"
                                            active={sortBy === "oldest"}
                                            onClick={() => {
                                                router.get(`/search`, {
                                                    sortBy: "oldest",
                                                });
                                            }}
                                            variant="outline"
                                        >
                                            Oldest
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

                <div className="min-h-screen mt-12 flex flex-wrap justify-center gap-4 gap-y-8">
                    {recipes.data && !recipes.data.length && !initialLoading ? (
                        <div className="text-center text-zinc-500 text-lg mt-6">
                            No result for {q}
                        </div>
                    ) : null}

                    {initialLoading
                        ? Array.from({ length: 20 }, (v, i) => (
                              <Skeleton className="w-[250px] h-[300px]" />
                          ))
                        : null}

                    {recipes.data && recipes.data.length > 0 && !initialLoading
                        ? recipes.data.map((recipe) => (
                              <RecipeCard data={recipe} />
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

export default SearchPage;
