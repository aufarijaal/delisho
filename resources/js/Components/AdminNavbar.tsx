import { Icon } from "@iconify-icon/react";
import { router, useForm } from "@inertiajs/react";
import React, { useRef } from "react";
import { Form, Input, Button, Dropdown, Navbar } from "react-daisyui";
import { Link } from "@inertiajs/react";
import NotificationNavItem from "./NotificationNavItem";

const AdminNavbar: React.FC<{ user: any }> = ({ user }) => {
    const form = useForm();

    function logout() {
        form.post(route("logout"));
    }

    return (
        <Navbar className="bg-base-100 backdrop-blur-sm shadow-sm shadow-base-200 fixed top-0 left-0 z-10">
            <div className="flex-none">
                <Dropdown>
                    <Button
                        tag="label"
                        color="ghost"
                        shape="circle"
                        tabIndex={0}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 6h16M4 12h16M4 18h7"
                            />
                        </svg>
                    </Button>
                    <Dropdown.Menu className="menu-sm w-52 mt-3 z-[1]">
                        <Dropdown.Item>Homepage</Dropdown.Item>
                        <Dropdown.Item>Portfolio</Dropdown.Item>
                        <Dropdown.Item>About</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="flex-1 flex items-center">
                <Dropdown>
                    <Dropdown.Menu className="w-52 menu-sm mt-3 z-[1] p-2">
                        <li className="p-2 font-bold">{user?.email}</li>
                        <li>
                            <Link
                                href={route("profile.edit")}
                                className="justify-between"
                            >
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link
                                href={route("account.recipes")}
                                className="justify-between"
                            >
                                Recipes
                            </Link>
                        </li>
                        <li>
                            <label className="swap swap-rotate bg-none w-full flex relative justify-between">
                                <span>Theme</span>
                                {/* this hidden checkbox controls the state */}
                                <input
                                    type="checkbox"
                                    className="theme-controller hidden"
                                    value="delisho"
                                />

                                {/* sun icon */}
                                <svg
                                    className="swap-off h-5 w-5 fill-current absolute right-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                {/* moon icon */}
                                <svg
                                    className="swap-on h-5 w-5 fill-current absolute right-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </li>
                        <Dropdown.Item>Settings</Dropdown.Item>
                        <Dropdown.Item onClick={() => logout()}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
                <Link
                    href="/admin/dashboard"
                    className="text-xl normal-case flex items-center font-bold gap-2 px-4"
                >
                    <img src="/logo.svg" alt="logo" className="w-8 h-8" />
                    Delisho
                </Link>
            </div>
            <div className="flex-none gap-2 items-center">
                <NotificationNavItem />
                <Dropdown end className="size-8">
                    <button className="avatar">
                        <div className="size-8 rounded-full p-1 text-yellow-500">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="100%"
                                height="100%"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="currentColor"
                                    d="M12 14v8H4a8 8 0 0 1 8-8m0-1c-3.315 0-6-2.685-6-6s2.685-6 6-6s6 2.685 6 6s-2.685 6-6 6m9 4h1v5h-8v-5h1v-1a3 3 0 1 1 6 0zm-2 0v-1a1 1 0 1 0-2 0v1z"
                                ></path>
                            </svg>
                        </div>
                    </button>
                    <Dropdown.Menu className="w-52 menu-sm mt-3 z-[1] p-2">
                        <li className="p-2 font-bold">{user?.email}</li>
                        <li>
                            <label className="swap swap-rotate bg-none w-full flex relative justify-between">
                                <span>Theme</span>
                                {/* this hidden checkbox controls the state */}
                                <input
                                    type="checkbox"
                                    className="theme-controller hidden"
                                    value="delisho"
                                />

                                {/* sun icon */}
                                <svg
                                    className="swap-off h-5 w-5 fill-current absolute right-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                                </svg>
                                {/* moon icon */}
                                <svg
                                    className="swap-on h-5 w-5 fill-current absolute right-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                                </svg>
                            </label>
                        </li>
                        <Dropdown.Item onClick={() => logout()}>
                            Logout
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </div>
        </Navbar>
    );
};

export default AdminNavbar;
