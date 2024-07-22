import React, { useState } from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Head, usePage } from "@inertiajs/react";
import { Button, Dropdown, Pagination, Skeleton, Tabs } from "react-daisyui";
import RecipeCard from "@/Components/RecipeCard";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import AccountRecipeLayout from "@/Layouts/AccountRecipeLayout";
import JsonViewer from "@andypf/json-viewer/dist/esm/react/JsonViewer";

const MyRecipes = ({ auth, recipes }) => {
    const [initialLoading, setInitialLoading] = useState(false);

    return (
        <AccountRecipeLayout auth={auth} recipes={recipes} tab="my">
            {recipes.data && !recipes.data.length && !initialLoading ? (
                <div className="text-center text-zinc-500 text-lg mt-6">
                    You have no recipes
                </div>
            ) : null}

            {initialLoading
                ? Array.from({ length: 20 }, (v, i) => (
                      <Skeleton className="w-[250px] h-[300px]" key={i}/>
                  ))
                : null}

            {recipes.data && recipes.data.length > 0 && !initialLoading
                ? recipes.data.map((recipe: any) => (
                      <RecipeCard data={recipe} showPub hideSave showEdit key={recipe.id}/>
                  ))
                : null}
        </AccountRecipeLayout>
    );
};

export default MyRecipes;
