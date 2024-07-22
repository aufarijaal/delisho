import AuthenticatedLayout from "@/Layouts/DefaultLayout";
import {Head, router, useForm, usePage} from "@inertiajs/react";
import {PageProps} from "@/types";
import {Icon} from "@iconify-icon/react/dist/iconify.mjs";
import {
    Button,
    Dropdown,
    Input,
    Link,
    Navbar,
    Select,
    Textarea,
} from "react-daisyui";
import pickRandom from "@/Utils/pick-random";
import {useState, useEffect, useRef} from "react";
import {ReactSortable} from "react-sortablejs";
import {resolveFinalImageUrl} from "@/Utils/image-url-resolver";

const IngredientItem: React.FC<{
    value: string;
    onValueChange: (v: string) => void;
    onRemove: () => void;
}> = ({value, onValueChange, onRemove}) => {
    return (
        <div className="ingredient-item flex items-center w-full gap-2">
            <button
                className="h-full w-[40px] grid place-items-center cursor-grab active:cursor-grabbing"
                type="button"
                tabIndex={-1}
            >
                <Icon icon="mdi:drag" width="24"/>
            </button>
            <Input
                id="ingredient-item"
                placeholder="Onion"
                className="flex-grow"
                size="sm"
                value={value}
                required
                onInput={(e) => onValueChange(e.currentTarget.value)}
            />

            <Dropdown className="dropdown-end">
                <Dropdown.Toggle size="sm" color="ghost">
                    <Icon icon="mdi:dots-horizontal" width="20"/>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-max z-10">
                    <Dropdown.Item onClick={() => onRemove()}>
                        Remove item
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

const StepItem: React.FC<{
    stepIndex: number;
    value: string;
    onValueChange: (v: string) => void;
    onRemove: () => void;
    recipeId: number;
    image?: string;
    stepId: number;
    wholeSteps: any;
}> = ({
          value,
          stepIndex,
          onValueChange,
          onRemove,
          recipeId,
          image,
          stepId,
          wholeSteps,
      }) => {
    // const stepImageRef = useRef(null);

    // const handleStepImageUpload = (e: any) => {
    //     const file = e.target.files[0];
    //     const formData = new FormData();
    //     formData.append("step_item_image", file);
    //     formData.append("step_index", stepIndex.toString());
    //     formData.append("step_id", stepId.toString());
    //     formData.append("steps", JSON.stringify(wholeSteps));
    //     formData.append("_method", "PUT");
    //     router.post(`/recipes/${recipeId}/step-image`, formData);
    // };

    // const handleStepImageDelete = (e: any) => {
    //     if (confirm("Are you sure?")) {
    //         router.delete(`/recipes/${recipeId}/step-image`);
    //     }
    // };

    return (
        <div className="cooking-step-item flex items-center w-full gap-2 my-3">
            <button
                className="h-full w-[40px] grid place-items-center cursor-grab active:cursor-grabbing"
                type="button"
                tabIndex={-1}
            >
                <Icon icon="mdi:drag" width="24"/>
            </button>
            <div className="flex-grow relative">
                <div
                    className="w-[25px] h-[25px] rounded-full bg-accent text-white grid place-items-center text-sm font-semibold absolute -top-3 -left-3">
                    {stepIndex}
                </div>
                <Textarea
                    name={`step_item_${stepId}`}
                    id={`step_item_${stepId}`}
                    placeholder="Prepare the water"
                    className="w-full"
                    value={value}
                    required
                    onInput={(e) => onValueChange(e.currentTarget.value)}
                />
                {/* <div className="cooking-step-item__image">
                    <input
                        ref={stepImageRef}
                        type="file"
                        name={`step_item_image_${stepId}`}
                        id={`step_item_image_${stepId}`}
                        hidden
                        accept="image/png, image/jpg, image/jpeg, image/webp"
                        onChange={handleStepImageUpload}
                    />
                    {image ? (
                        <img src={image} alt={"step image"} />
                    ) : (
                        <div
                            className="w-[120px] h-[85px] rounded-lg bg-orange-50 text-orange-500 flex flex-col justify-center items-center cursor-pointer"
                            onClick={() =>
                                (stepImageRef.current as any).click()
                            }
                        >
                            <Icon icon="mdi:camera" width="32" />
                        </div>
                    )}
                </div> */}
            </div>

            <Dropdown className="dropdown-end">
                <Dropdown.Toggle size="sm" color="ghost">
                    <Icon icon="mdi:dots-horizontal" width="20"/>
                </Dropdown.Toggle>

                <Dropdown.Menu className="w-max z-10">
                    <Dropdown.Item onClick={() => onRemove()}>
                        Remove item
                    </Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
        </div>
    );
};

export default function CreateRecipePage({
                                             auth,
                                             recipe,
                                             categories,
                                             errors,
                                         }: any) {
    const [showButton, setShowButton] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [scrollThreshold, setScrollThreshold] = useState(100);
    const inputFinalImage = useRef(null);

    const {data, setData} = useForm<{
        title: string;
        description: string;
        portion: string;
        cooking_time: string;
        ingredients: { id: number; value: string }[];
        steps: { id: number; value: string; image: string | null }[];
        final_image?: any;
        category_id: number;
    }>({
        title: recipe.title ?? "",
        description: recipe.description ?? "",
        portion: recipe.portion ?? "",
        cooking_time: recipe.cooking_time ?? "",
        ingredients: JSON.parse(recipe.ingredients),
        steps: JSON.parse(recipe.steps),
        category_id: recipe.category_id,
    });

    const handleChange = (e: any) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const handleFinalImageUpload = (e: any) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("final_image", file);
        formData.append("_method", "PUT");
        router.post(`/recipes/${recipe.id}/final-image`, formData);
    };

    const handleFinalImageDelete = (e: any) => {
        if (confirm("Are you sure?")) {
            router.delete(`/recipes/${recipe.id}/final-image`);
        }
    };

    const handleSubmit = (action: "publish" | "unpublish" | "save") => {
        const formData = new FormData();

        formData.append("action", action);
        formData.append("_method", "PUT");

        Object.keys(data).forEach((key) => {
            if (key === "ingredients" || key === "steps") {
                const itemData = data[key].map((item) => ({
                    id: item.id,
                    value: item.value,
                }));
                formData.append(key, JSON.stringify(itemData));
            } else if (key === "final_image") {
                if (data[key]) {
                    formData.append(key, data[key]);
                }
            } else {
                formData.append(key, (data as any)[key]);
            }
        });

        router.post(`/recipes/${recipe.id}`, formData);
    };

    return (
        <main className="min-h-screen bg-[#f8f6f2] pt-20">
            <Head title="Create Recipe"/>

            <Navbar className="bg-base-100 backdrop-blur-sm shadow-sm shadow-base-200 fixed top-0 left-0 z-10">
                <div className="flex-1 flex items-center ml-4">
                    <button
                        type="button"
                        className="flex items-center gap-2 btn btn-sm hover:no-underline"
                        onClick={(e) => {
                            e.preventDefault();
                            if (confirm("Are you sure want to go back?")) {
                                router.get("/account/recipes");
                            }
                        }}
                    >
                        <Icon icon="mdi:arrow-left" width="20"/>
                        Back
                    </button>
                    <Link
                        href="/"
                        className="text-xl normal-case flex items-center font-bold gap-2 px-4"
                    >
                        <img src="/logo.svg" alt="logo" className="w-8 h-8"/>
                        Delisho
                    </Link>
                </div>

                <div className="flex-none gap-4 items-center pr-4">
                    <span className="text-sm text-zinc-600 flex items-center gap-2 font-bold">
                        {recipe.published ? <>
                            <Icon
                                icon="material-symbols:check-circle"
                                width="20"
                                className="text-success"
                            />
                            Published
                        </> : <>
                            <Icon
                                icon="material-symbols:unpublished"
                                width="20"
                                className="text-error"
                            />
                            Not published
                        </>}
                    </span>
                </div>
            </Navbar>

            <div className="pt-12 px-2 pb-20">
                <div className="max-w-3xl mx-auto sm:px-6 lg:px-8">
                    <form
                        className="flex flex-col bg-white p-4 sm:p-10 rounded-xl"
                        id="form-create-recipe"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="file"
                            hidden
                            ref={inputFinalImage}
                            onChange={handleFinalImageUpload}
                            accept="image/png, image/jpg, image/jpeg, image/webp"
                        />

                        <div className="self-center flex justify-center flex-col">
                            {!recipe.final_image ? (
                                <div
                                    className={`border w-[300px] h-[200px] flex flex-col justify-center items-center rounded-md gap-2 self-center bg-white cursor-pointer ${
                                        errors.final_image
                                            ? "border-rose-500"
                                            : ""
                                    }`}
                                    onClick={() =>
                                        (inputFinalImage.current as any).click()
                                    }
                                >
                                    <Icon icon="mdi:camera" width="32"/>
                                    <span className="text-sm">
                                        Upload your final image here
                                    </span>
                                </div>
                            ) : (
                                <div className="self-center flex flex-col gap-2 items-center">
                                    <img
                                        className="max-w-[300px] max-h-[200px]"
                                        src={resolveFinalImageUrl(
                                            recipe.final_image
                                        )}
                                        alt="preview image"
                                    />
                                    <div className="flex gap-2">
                                        <Button
                                            type="button"
                                            size="xs"
                                            onClick={() =>
                                                (
                                                    inputFinalImage.current as any
                                                ).click()
                                            }
                                        >
                                            Change
                                        </Button>
                                        <Button
                                            size="xs"
                                            color="error"
                                            type="button"
                                            onClick={handleFinalImageDelete}
                                        >
                                            Remove
                                        </Button>
                                    </div>
                                </div>
                            )}

                            <div className="mt-2">
                                {errors.final_image && (
                                    <p className="text-sm text-center text-rose-500">
                                        {errors.final_image}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Title */}
                        <div className="mt-4 flex flex-col gap-2">
                            <label
                                htmlFor="title"
                                className="text-xl font-semibold"
                            >
                                Title
                            </label>
                            <Input
                                id="title"
                                placeholder="Fried Rice"
                                className={`w-full font-serif text-3xl ${
                                    errors.title ? "border-rose-500" : ""
                                }`}
                                size="lg"
                                name="title"
                                onChange={handleChange}
                                value={data.title}
                            />
                            {errors.title && (
                                <p className="text-sm text-rose-500">
                                    {errors.title}
                                </p>
                            )}
                        </div>

                        {/* Category */}
                        <div className="mt-4 flex flex-col gap-2">
                            <label
                                htmlFor="category"
                                className="text-xl font-semibold"
                            >
                                Category
                            </label>
                            <Select
                                id="category"
                                className={`w-full ${
                                    errors.title ? "border-rose-500" : ""
                                }`}
                                name="category_id"
                                onChange={handleChange}
                                value={data.category_id}
                            >
                                {categories.map((category) => (
                                    <Select.Option
                                        value={category.id}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </Select.Option>
                                ))}
                            </Select>
                            {errors.category_id && (
                                <p className="text-sm text-rose-500">
                                    {errors.category_id}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="mt-6 flex flex-col gap-2">
                            <label
                                htmlFor="description"
                                className="text-xl font-semibold"
                            >
                                Description
                            </label>

                            <Textarea
                                id="description"
                                className={`w-full text-sm p-4 ${
                                    errors.description ? "border-rose-500" : ""
                                }`}
                                size="lg"
                                name="description"
                                onChange={handleChange}
                                value={data.description}
                                maxLength={255}
                            />
                            {errors.description && (
                                <p className="text-sm text-rose-500">
                                    {errors.description}
                                </p>
                            )}
                        </div>

                        {/* Portion */}
                        <div className="mt-6 flex flex-col gap-2">
                            <label
                                htmlFor="portion"
                                className="text-xl font-semibold"
                            >
                                Portion
                            </label>

                            <Input
                                id="portion"
                                placeholder="2 person"
                                className="w-full max-w-sm"
                                name="portion"
                                onChange={handleChange}
                                value={data.portion}
                            />
                            {errors.portion && (
                                <p className="text-sm text-rose-500">
                                    {errors.portion}
                                </p>
                            )}
                        </div>

                        {/* Cooking time */}
                        <div className="mt-6 flex flex-col gap-2">
                            <label
                                htmlFor="cooking-duration"
                                className="text-xl font-semibold"
                            >
                                Cooking time
                            </label>

                            <Input
                                id="cooking-time"
                                placeholder="1 hour"
                                className="w-full max-w-sm"
                                name="cooking_time"
                                onChange={handleChange}
                                value={data.cooking_time}
                            />
                            {errors.cooking_time && (
                                <p className="text-sm text-rose-500">
                                    {errors.cooking_time}
                                </p>
                            )}
                        </div>

                        {/* Ingredients */}
                        <div className="mt-6 flex flex-col gap-4">
                            <label
                                htmlFor="ingredients"
                                className="text-xl font-semibold"
                            >
                                Ingredients
                            </label>

                            <div className="flex flex-col gap-2">
                                <ReactSortable
                                    tag="div"
                                    className="ingredient-list flex flex-col gap-4"
                                    animation={200}
                                    list={data.ingredients}
                                    setList={(newState) => {
                                        setData({
                                            ...data,
                                            ingredients: newState,
                                        });
                                    }}
                                >
                                    {data.ingredients.map((ingredient, i) => (
                                        <IngredientItem
                                            key={ingredient.id}
                                            value={ingredient.value}
                                            onValueChange={(value) => {
                                                const newIngredients = [
                                                    ...data.ingredients,
                                                ];
                                                newIngredients[i].value = value;
                                                setData({
                                                    ...data,
                                                    ingredients: newIngredients,
                                                });
                                            }}
                                            onRemove={() => {
                                                setData({
                                                    ...data,
                                                    ingredients:
                                                        data.ingredients.filter(
                                                            (item) =>
                                                                item.id !==
                                                                ingredient.id
                                                        ),
                                                });
                                            }}
                                        />
                                    ))}
                                </ReactSortable>
                                <div className="flex self-center gap-2">
                                    {/* <Button
                                                size="sm"
                                                color="accent"
                                                variant="outline"
                                                type="button"
                                                className="text-white shadow-md shadow-accent/50 w-max"
                                            >
                                                <Icon icon="mdi:plus" width="20" />
                                                Group
                                            </Button> */}
                                    <Button
                                        size="sm"
                                        color="accent"
                                        variant="outline"
                                        type="button"
                                        className="text-white shadow-md shadow-accent/50 w-max"
                                        onClick={() => {
                                            setData({
                                                ...data,
                                                ingredients: [
                                                    ...data.ingredients,
                                                    {
                                                        id: new Date().valueOf(),
                                                        value: "",
                                                    },
                                                ],
                                            });
                                        }}
                                    >
                                        <Icon icon="mdi:plus" width="20"/>
                                        Ingredient
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Steps */}
                        <div className="mt-6 flex flex-col gap-4">
                            <label
                                htmlFor="steps"
                                className="text-xl font-semibold"
                            >
                                Steps
                            </label>

                            <div className="flex flex-col gap-2">
                                {errors.step_item_image && (
                                    <p className="text-sm text-rose-500 mt-2">
                                        {errors.step_item_image}
                                    </p>
                                )}

                                <ReactSortable
                                    tag="div"
                                    animation={200}
                                    className="cooking-step-list flex flex-col"
                                    list={data.steps}
                                    setList={(newState) => {
                                        setData({
                                            ...data,
                                            steps: newState,
                                        });
                                    }}
                                >
                                    {data.steps.map((step, i) => (
                                        <StepItem
                                            recipeId={recipe.id}
                                            key={step.id}
                                            stepIndex={i + 1}
                                            stepId={step.id}
                                            value={step.value}
                                            image={
                                                step.image as string | undefined
                                            }
                                            wholeSteps={data.steps}
                                            onValueChange={(value) => {
                                                const newSteps = [
                                                    ...data.steps,
                                                ];
                                                newSteps[i].value = value;
                                                setData({
                                                    ...data,
                                                    steps: newSteps,
                                                });
                                            }}
                                            onRemove={() => {
                                                setData({
                                                    ...data,
                                                    steps: data.steps.filter(
                                                        (item) =>
                                                            item.id !== step.id
                                                    ),
                                                });
                                            }}
                                        />
                                    ))}
                                </ReactSortable>
                                <Button
                                    size="sm"
                                    color="accent"
                                    variant="outline"
                                    type="button"
                                    className="text-white shadow-md shadow-accent/50 w-max self-center"
                                    onClick={() => {
                                        setData({
                                            ...data,
                                            steps: [
                                                ...data.steps,
                                                {
                                                    id: new Date().valueOf(),
                                                    value: "",
                                                    image: null,
                                                },
                                            ],
                                        });
                                    }}
                                >
                                    <Icon icon="mdi:plus" width="20"/>
                                    Step
                                </Button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className="mt-10 self-center flex gap-4 items-center">
                            {!recipe.published ? (
                                <Button
                                    color="accent"
                                    className="text-white shadow-md shadow-accent/50 disabled:shadow-current w-max"
                                    type="button"
                                    onClick={() => handleSubmit("publish")}
                                >
                                    Publish
                                </Button>
                            ) : (
                                <Button
                                    color="error"
                                    type="button"
                                    onClick={() => handleSubmit("unpublish")}
                                >
                                    Unpublish
                                </Button>
                            )}
                            or
                            <Button
                                type="button"
                                color="primary"
                                onClick={() => handleSubmit("save")}
                            >
                                Save
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
