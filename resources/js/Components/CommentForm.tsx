import { Button, Dropdown, Input } from "react-daisyui";
import { Icon } from "@iconify-icon/react";
import React, { useState } from "react";
import { router, useForm } from "@inertiajs/react";
import { resolveProfilePictureUrl } from "@/Utils/image-url-resolver";
import EmojiPicker from "@emoji-mart/react";
import emojis from "@emoji-mart/data";

export default function CommentForm({ recipeId, user }: any) {
    const { data, setData, errors } = useForm({
        body: "",
        recipe_id: recipeId,
    });
    const [cursorPos, setCursorPos] = useState(0);

    async function handleSubmit(e: any) {
        e.preventDefault();

        router.post("/comments", data);
    }

    function onEmojiSelect(emoji: any) {
        setData({
            ...data,
            body: data.body.replace(
                new RegExp(`^(.{${cursorPos}})`),
                `$1${emoji.native}`
            ),
        });
    }

    function setCursorPosition(e: any) {
        setCursorPos(e.currentTarget.selectionStart ?? 0);
    }

    return (
        <form
            className="form-comment flex items-center gap-2 mt-4"
            onSubmit={handleSubmit}
        >
            <img
                className="size-7 rounded-full"
                src={resolveProfilePictureUrl(user?.photo)}
                alt="user profile picture"
                onError={({ currentTarget }) => {
                    currentTarget.onerror = null; // prevents looping
                    currentTarget.src = "/profile-picture-fallback.png";
                }}
            />
            <div className="flex flex-col gap-1 flex-1">
                <Input
                    size="sm"
                    className="rounded-full"
                    required
                    value={data.body}
                    onInput={(e) =>
                        setData({ ...data, body: e.currentTarget.value })
                    }
                    onKeyUp={setCursorPosition}
                    onClick={setCursorPosition}
                    maxLength={255}
                />
                {errors.body && (
                    <p className="text-sm text-error">{errors.body}</p>
                )}
            </div>
            <Dropdown end>
                <Button type="button" size="sm" shape="circle" color="ghost">
                    😋
                </Button>
                <Dropdown.Menu className="p-0 bg-none shadow-none bg-rose-500 mt-2 z-[1]">
                    <li className="[&>div]:p-0">
                        <EmojiPicker
                            data={emojis}
                            onEmojiSelect={onEmojiSelect}
                            theme="light"
                        />
                    </li>
                </Dropdown.Menu>
            </Dropdown>
            <Button shape="circle" size="sm" color="accent" variant="outline">
                <Icon icon="material-symbols:send" />
            </Button>
        </form>
    );
}
