import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, router, useForm, usePage } from "@inertiajs/react";
import { Transition } from "@headlessui/react";
import { FormEventHandler, useRef } from "react";
import { PageProps } from "@/types";
import { Button, Input } from "react-daisyui";
import { resolveProfilePictureUrl } from "@/Utils/image-url-resolver";

export default function UpdateProfilePictureForm({
    className = "",
}: {
    className?: string;
}) {
    const page = usePage<PageProps>();
    const user = page.props.auth.user;
    const inputPhotoRef = useRef(null);

    const handleInputPhotoChange = (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();

        formData.append("_method", "PATCH");
        formData.append("photo", file);
        router.post(route("profile_picture.update"), formData);
    };

    const deleteProfilePicture = () => {
        router.delete(route("profile_picture.destroy"));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium">Profile Picture</h2>
                <p className="text-sm text-error">{page.props.errors.photo}</p>
            </header>

            <form className="mt-6 space-y-6">
                <div>
                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        hidden
                        ref={inputPhotoRef}
                        accept="image/*"
                        onChange={handleInputPhotoChange}
                    />
                    <img
                        className="size-[160px] rounded-full"
                        src={resolveProfilePictureUrl(user.photo ?? "")}
                        alt="user profile picture"
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src = "/profile-picture-fallback.png";
                        }}
                    />
                </div>

                <div className="flex items-center gap-4">
                    <Button
                        color="primary"
                        size="sm"
                        type="button"
                        onClick={() => {
                            inputPhotoRef.current.click();
                        }}
                    >
                        Upload
                    </Button>
                    {user.photo && (
                        <Button
                            color="error"
                            size="sm"
                            type="button"
                            onClick={() => deleteProfilePicture()}
                        >
                            Remove
                        </Button>
                    )}
                </div>
            </form>
        </section>
    );
}
