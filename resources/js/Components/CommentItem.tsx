import { resolveProfilePictureUrl } from "@/Utils/image-url-resolver";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import { router } from "@inertiajs/react";
import dayjs from "dayjs";
import humanizeDuration from "humanize-duration";
import { Dropdown, Button } from "react-daisyui";

const CommentItem = ({ auth, data }) => {
    return (
        <div className="comment-item flex flex-col gap-2 border border-base-200 p-4 rounded-lg">
            <div className="flex items-center gap-2">
                <img
                    className="size-7 rounded-full"
                    src={resolveProfilePictureUrl(data.user.photo)}
                    alt="user profile picture"
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "/profile-picture-fallback.png";
                    }}
                />
                <div className="flex-1">
                    <p className="text-sm font-bold">{data.user.name}</p>
                    <p className="text-sm text-zinc-500">
                        @{data.user.username}
                    </p>
                </div>
                {auth.user.id === data.user.id ? (
                    <Dropdown end>
                        <Button size="sm" color="ghost">
                            <Icon icon="tabler:dots" width="20" />
                        </Button>
                        <Dropdown.Menu className="w-max menu-sm mt-3 z-[1] p-2">
                            {/* <Dropdown.Item>
                                <Icon icon="mdi:pencil" />
                                Edit
                            </Dropdown.Item> */}
                            <Dropdown.Item
                                onClick={() => {
                                    router.delete(`/comments/${data.id}`);
                                }}
                            >
                                <Icon icon="mdi:delete" />
                                Delete
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                ) : null}
            </div>
            <div className="flex gap-2 items-center">
                <p className="text-sm flex-1">{data.body}</p>
            </div>
            <p className="text-xs text-zinc-500">
                {humanizeDuration(dayjs(data.created_at).diff(dayjs())).split(
                    ","
                )[0] + " ago"}
            </p>
        </div>
    );
};

export default CommentItem;
