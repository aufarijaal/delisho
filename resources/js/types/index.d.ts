import { Config } from "ziggy-js";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    photo?: string;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>
> = T & {
    auth: {
        user: User;
    };
    ziggy: Config & { location: string };
    errors: Record<string, string>;
};

interface RecipeCardItem {
    id: number;
    final_image: string;
    title: string;
    slug: string;
    author: {
        id: number;
        name: string;
        photo: string | null;
    };
    created_at: string;
    saves_count?: number;
    saved: boolean;
    category: {
        id: number;
        name: string;
        slug: string;
    };
    published: boolean;
}
