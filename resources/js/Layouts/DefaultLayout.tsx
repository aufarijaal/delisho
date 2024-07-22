import { useState, PropsWithChildren, ReactNode } from "react";
import { Link } from "@inertiajs/react";
import { User } from "@/types";
import { Button, Dropdown, Form, Input, Navbar } from "react-daisyui";
import { Icon } from "@iconify-icon/react/dist/iconify.mjs";
import SiteNavbar from "@/Components/SiteNavbar";
import SiteFooter from "@/Components/SiteFooter";

export default function DefaultLayout({
    user,
    header,
    children,
}: PropsWithChildren<{ user: User; header?: ReactNode }>) {
    return (
        <div className="min-h-screen bg-[#f8f6f2]">
            <SiteNavbar user={user} />
            <main className="pt-20">{children}</main>
            <SiteFooter />
        </div>
    );
}
