import React from "react";
import DefaultLayout from "@/Layouts/DefaultLayout";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Head, router } from "@inertiajs/react";
import dayjs from "dayjs";
import humanizeDuration from "humanize-duration";
import { Button, Dropdown, Input, Link } from "react-daisyui";
import JsonViewer from "@andypf/json-viewer/dist/esm/react/JsonViewer";
import {
    resolveFinalImageUrl,
    resolveProfilePictureUrl,
} from "@/Utils/image-url-resolver";
import prettyDigits from "@/Utils/pretty-digits";
import CommentForm from "@/Components/CommentForm";
import RecipeCard from "@/Components/RecipeCard";
import CommentItem from "@/Components/CommentItem";

const PostRead = ({ auth, recipe, canEdit, more }: any) => {
    function copyCurrentLink() {
        navigator.clipboard.writeText(location.href);
    }

    return (
        <DefaultLayout user={auth.user}>
            <Head>
                <title>{`${recipe.title} by ${recipe.author.name}`}</title>
            </Head>

            <div className="max-w-4xl mx-auto px-2 pb-32">
                <article className="flex-grow bg-base-100 p-6 rounded-lg">
                    <div>
                        <img
                            className="w-full max-h-[400px] object-cover rounded-t-lg"
                            src={resolveFinalImageUrl(recipe.final_image)}
                            alt="final image"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null;
                                currentTarget.src = "/recipe-fallback.png";
                            }}
                        />
                    </div>

                    <div className="mt-6">
                        {canEdit && (
                            <div className="my-6 flex items-center">
                                <Button
                                    size="sm"
                                    color="success"
                                    onClick={() => {
                                        router.get(
                                            `/account/recipes/${recipe.id}/edit`
                                        );
                                    }}
                                >
                                    <Icon icon="mdi:pencil" width="24" />
                                    Edit this
                                </Button>
                            </div>
                        )}

                        <h1 className="text-2xl sm:text-4xl font-bold font-serif tracking-wide">
                            {recipe.title}
                        </h1>

                        <div className="my-4">
                            In &nbsp;
                            <Link
                                className="bg-orange-50 text-orange-500 px-3 py-1 rounded-lg font-semibold text-lg hover:no-underline"
                                href={`/categories/${recipe.category.slug}`}
                            >
                                {recipe.category.name}
                            </Link>
                        </div>

                        <div className="my-4 text-zinc-600">
                            <p>
                                {humanizeDuration(
                                    dayjs(recipe.created_at).diff(dayjs())
                                ).split(",")[0] + " ago"}
                            </p>
                        </div>

                        <div className="flex items-center gap-2 mb-10">
                            <img
                                src={resolveProfilePictureUrl(
                                    recipe.author.photo ?? ""
                                )}
                                alt="author image"
                                onError={({ currentTarget }) => {
                                    currentTarget.onerror = null; // prevents looping
                                    currentTarget.src =
                                        "/profile-picture-fallback.png";
                                }}
                                className="w-[30px] h-[30px] rounded-full"
                            />
                            {recipe.author.name}
                        </div>

                        <div className="mt-4">
                            <h4 className="font-serif text-lg sm:text-2xl border-b-2 border-accent flex w-max items-center gap-2">
                                <Icon
                                    icon="fluent:text-description-ltr-24-filled"
                                    width="24"
                                />
                                Description
                            </h4>

                            <p className="mt-2 text-justify pl-4 text-sm sm:text-base">
                                {recipe.description}
                            </p>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            <h4 className="font-serif text-lg sm:text-2xl border-b-2 border-accent flex w-max items-center gap-2">
                                <Icon icon="ep:food" width="24" />
                                Portion
                            </h4>
                            <p className="font-bold pl-4 text-sm sm:text-base">
                                {recipe.portion}
                            </p>
                        </div>

                        <div className="mt-4 flex flex-col gap-2">
                            <h4 className="font-serif text-lg sm:text-2xl border-b-2 border-accent flex w-max items-center gap-2">
                                <Icon icon="mdi:timer-outline" width="24" />
                                Cooking time
                            </h4>
                            <p className="font-bold pl-4 text-sm sm:text-base">
                                {recipe.cooking_time}
                            </p>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-serif text-lg sm:text-2xl border-b-2 border-accent flex w-max items-center gap-2">
                                <Icon
                                    icon="clarity:blocks-group-line"
                                    width="24"
                                />
                                Ingredients
                            </h4>

                            <div className="pl-4 text-sm sm:text-base">
                                <div className="mt-4">
                                    <h6 className="font-bold"></h6>
                                    <ul className="ingredient-list list-disc list-inside mt-2">
                                        {JSON.parse(recipe.ingredients).map(
                                            (ingredient) => (
                                                <li key={ingredient.id}>
                                                    {ingredient.value}
                                                </li>
                                            )
                                        )}
                                    </ul>
                                </div>

                                {/* <div className="mt-4">
                                    <h6 className="font-bold">Bumbu halus</h6>
                                    <ul className="ingredient-list list-disc list-inside mt-2">
                                        <li>1/2 sendok telur</li>
                                        <li>1/2 sendok telur</li>
                                        <li>1/2 sendok telur</li>
                                        <li>1/2 sendok telur</li>
                                        <li>1/2 sendok telur</li>
                                    </ul>
                                </div> */}
                            </div>
                        </div>

                        <div className="mt-6">
                            <h4 className="font-serif text-lg sm:text-2xl border-b-2 border-accent flex w-max items-center gap-2">
                                <Icon
                                    icon="fluent:steps-16-regular"
                                    width="24"
                                />
                                Steps
                            </h4>

                            <div className="pl-4">
                                <ol className="mt-4 flex flex-col gap-4">
                                    {JSON.parse(recipe.steps).map((step, i) => (
                                        <li
                                            className="flex flex-col gap-2 text-sm sm:text-base"
                                            key={step.id}
                                        >
                                            <div className="flex gap-2">
                                                <div className="w-[25px] h-[25px] rounded-full grid place-items-center bg-accent text-white flex-shrink-0">
                                                    {i + 1}
                                                </div>
                                                <p>{step.value}</p>
                                            </div>

                                            {/* <div className="flex gap-2 pl-8">
                                                {Array.from(
                                                    { length: 3 },
                                                    (v, i) => (
                                                        <img
                                                            className="md:w-[200px] md:h-[150px] size-[65px] object-cover rounded-md"
                                                            src="https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1192.jpg"
                                                            alt="step photo"
                                                        />
                                                    )
                                                )}
                                            </div> */}
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                </article>

                <section className="action-section bg-base-100 rounded-lg mt-10 p-4 flex gap-2">
                    <form method="post">
                        <Button
                            size="sm"
                            color="accent"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                !recipe.saved
                                    ? router.post(`/savedrecipes`, {
                                          recipe_id: recipe.id,
                                      })
                                    : router.delete(
                                          `/savedrecipes/${recipe.id}`
                                      );
                            }}
                        >
                            {recipe.saved ? (
                                <Icon icon="mdi:bookmark" width="24" />
                            ) : (
                                <Icon icon="mdi:bookmark-outline" width="24" />
                            )}
                            {prettyDigits(recipe.saves_count)}
                        </Button>
                    </form>
                    <Dropdown>
                        <Button size="sm" color="accent">
                            <Icon icon="tabler:share" width="20" />
                        </Button>
                        <Dropdown.Menu className="w-max menu-sm z-[1] space-y-1">
                            <Dropdown.Item onClick={copyCurrentLink}>
                                <Icon icon="clarity:link-line" width="24" />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon
                                    icon="fa6-brands:square-x-twitter"
                                    width="24"
                                />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon
                                    icon="fa6-brands:facebook"
                                    width="24"
                                    className="text-sky-500"
                                />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon
                                    icon="fa6-brands:square-instagram"
                                    width="24"
                                    className="text-fuchsia-500"
                                />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon
                                    icon="fa6-brands:linkedin"
                                    width="24"
                                    className="text-blue-400"
                                />
                            </Dropdown.Item>
                            <Dropdown.Item>
                                <Icon
                                    icon="fa6-brands:pinterest"
                                    width="24"
                                    className="text-rose-500"
                                />
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </section>

                <div className="form-comment-section mt-10 p-4 bg-base-100 rounded-lg">
                    <h4 className="font-bold">Write a comment</h4>

                    <CommentForm recipeId={recipe.id} user={auth.user} />
                </div>

                <section className="comment-section bg-base-100 rounded-lg mt-10 p-4">
                    <h4 className="font-bold">Comments</h4>

                    <div className="comments mt-4 flex flex-col gap-2">
                        {recipe.comments.length ? (
                            recipe.comments.map((comment) => (
                                <CommentItem
                                    auth={auth}
                                    data={comment}
                                    key={comment.id}
                                />
                            ))
                        ) : (
                            <div className="text-zinc-500">
                                Be the first one to comment this post!
                                <br />
                                give yourcomment above
                            </div>
                        )}
                    </div>
                </section>

                <section className="more-from-this-author-section bg-base-100 rounded-lg mt-10 p-4">
                    <h4 className="font-bold">More from this author</h4>

                    <div className="flex gap-x-2 gap-y-8 mt-8 flex-wrap">
                        {more.length ? (
                            more.map((item) => (
                                <RecipeCard data={item} key={item.id} />
                            ))
                        ) : (
                            <div className="text-zinc-500">
                                No more recipes from this author
                            </div>
                        )}
                    </div>
                </section>
            </div>
        </DefaultLayout>
    );
};
export default PostRead;
