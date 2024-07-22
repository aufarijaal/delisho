import { RecipeCardItem } from "@/types";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { Button, Divider, Tooltip } from "react-daisyui";
import useRipple from "use-ripple-hook";
import twColors from "tailwindcss/colors";
import { Link, router } from "@inertiajs/react";
import prettyDigits from "@/Utils/pretty-digits";
import humanizeDuration from "humanize-duration";
import dayjs from "dayjs";
import {
    resolveFinalImageUrl,
    resolveProfilePictureUrl,
} from "@/Utils/image-url-resolver";

const RecipeCard: React.FC<{
    data: RecipeCardItem;
    hideSave?: boolean;
    hideAuthor?: boolean;
    showPub?: boolean;
    showDelete?: boolean;
    showEdit?: boolean;
}> = ({ data, hideSave, hideAuthor, showPub, showDelete, showEdit }) => {
    const [ripple, event] = useRipple({
        duration: 450,
        color: `${twColors.black}0001a`,
        cancelAutomatically: true,
    });

    return (
        <Link
            href={`/recipes/${data.id}/${data.slug}`}
            className={`recipe-item-card bg-white w-full max-w-[400px] sm:max-w-none sm:w-[250px] shadow-lg shadow-black/5 rounded-md cursor-pointer flex flex-col group ${
                hideSave ? "sm:h-max" : "sm:h-[340px]"
            }`}
            ref={data.published ? ripple : null}
            onClick={(e) => {
                if (data.published) {
                    event(e);
                } else {
                    e.preventDefault();
                }
            }}
        >
            <div className="recipe-item-card__image relative flex justify-center">
                <img
                    className="w-[calc(100%-40px)] h-[160px] -translate-y-4 rounded-md shadow-xl shadow-zinc-900/10 object-cover group-hover:brightness-95 group-hover:-translate-y-3 transition"
                    src={resolveFinalImageUrl(data.final_image)}
                    alt="recipe card image"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/recipe-fallback.png";
                    }}
                />
                <div className="-translate-y-3 absolute bg-zinc-900/40 text-xs text-white px-2 py-1 rounded-md left-0 translate-x-6 group-hover:-translate-y-2 transition">
                    {humanizeDuration(
                        dayjs(data.created_at).diff(dayjs())
                    ).split(",")[0] + " ago"}
                </div>
            </div>

            <div className="p-4 flex flex-col gap-4 flex-grow">
                <div title={data.title}>
                    <p className="line-clamp-1 font-serif text-lg">
                        {data.title}
                    </p>
                </div>
                {!hideAuthor && (
                    <div className="flex items-center gap-2 text-sm">
                        <img
                            className="size-[25px] rounded-full"
                            src={resolveProfilePictureUrl(
                                data.author.photo ?? ""
                            )}
                            alt="author image"
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                    "/profile-picture-fallback.png";
                            }}
                        />
                        <span className="line-clamp-1">{data.author.name}</span>
                    </div>
                )}

                <span className="text-sm bg-orange-50 size-max px-2 py-0.5 text-orange-500 font-semibold rounded-full block max-w-[200px] overflow-hidden text-ellipsis whitespace-nowrap">
                    {data.category.name}
                </span>

                <div className="flex gap-1 items-center">
                    {!hideSave && (
                        <Button
                            size="xs"
                            color="accent"
                            className="rounded-full"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                !data.saved
                                    ? router.post(`/savedrecipes`, {
                                          recipe_id: data.id,
                                      })
                                    : router.delete(`/savedrecipes/${data.id}`);
                            }}
                        >
                            {data.saved ? (
                                <Icon icon="mdi:bookmark" width="16" />
                            ) : (
                                <Icon icon="mdi:bookmark-outline" width="16" />
                            )}
                            {data.saves_count
                                ? prettyDigits(data.saves_count)
                                : ""}
                        </Button>
                    )}
                    {showEdit && (
                        <Button
                            title="Edit"
                            size="xs"
                            color="success"
                            className="rounded-full"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                router.get(`/account/recipes/${data.id}/edit`);
                            }}
                        >
                            <Icon icon="mdi:pencil" width="16" />
                        </Button>
                    )}
                    {showDelete && (
                        <Button
                            title="Delete"
                            size="xs"
                            color="error"
                            className="rounded-full"
                            onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();

                                if (confirm("Are you sure?")) {
                                    router.delete(`/recipes/${data.id}`);
                                }
                            }}
                        >
                            <Icon icon="mdi:delete" width="16" />
                        </Button>
                    )}
                    {showPub &&
                        (!data.published ? (
                            <Tooltip
                                message="Not published"
                                className="flex justify-center items-center"
                            >
                                <Icon
                                    icon="material-symbols:unpublished"
                                    width="16"
                                    className="text-error ml-2"
                                />
                            </Tooltip>
                        ) : (
                            <Tooltip
                                message="Published"
                                className="flex justify-center items-center"
                            >
                                <Icon
                                    icon="material-symbols:check-circle"
                                    width="16"
                                    className="text-success ml-2"
                                />
                            </Tooltip>
                        ))}
                </div>
            </div>
        </Link>
    );
};

export default RecipeCard;
