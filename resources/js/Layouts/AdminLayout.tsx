import AdminNavbar from "@/Components/AdminNavbar";
import { User } from "@/types";
import React, { PropsWithChildren } from "react";

export default function AdminLayout({
    user,
    children,
}: PropsWithChildren<{ user: User }>) {
    return (
        <div className="min-h-screen bg-[#f8f6f2]">
            <AdminNavbar user={user} />
            <main className="pt-20 h-screen">{children}</main>
        </div>
    );
}
