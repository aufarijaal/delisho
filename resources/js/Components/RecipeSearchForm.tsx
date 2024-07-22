import {Button, Input} from "react-daisyui";
import {Icon} from "@iconify-icon/react";
import {useState} from "react";
import {router} from "@inertiajs/react";

const RecipeSearchForm: React.FC<{
    size?: "xs" | "sm" | "md" | "lg"
    args?: any
    className?: string
}> = ({size, className, ...args}) => {
    const [search, setSearch] = useState("");

    function handleSearch() {
        router.get('/search', {
            q: search
        });
    }

    return <div className={`flex items-center gap-1 w-full ${className}`} {...args}>
        <Input
            bordered
            type="text"
            placeholder="Search"
            className="flex-1"
            value={search}
            size={size}
            onInput={(e) => {
                setSearch(e.currentTarget.value)
            }}
            onKeyUp={(e) => {
                if (e.key === 'Enter') {
                    handleSearch()
                }
            }}
        />
        <Button color="accent" onClick={() => handleSearch()} size={size}>
            <Icon icon="mingcute:search-line" width="20"/>
        </Button>
    </div>
}

export default RecipeSearchForm;
