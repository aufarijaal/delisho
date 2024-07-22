import React from "react";
import { Dropdown, Button } from "react-daisyui";
import { Link } from "@inertiajs/react";
import { Icon } from "@iconify-icon/react";

const NotificationNavItem = () => {
    return (
        <Dropdown end>
            <Button shape="circle" color="ghost" size="sm">
                <Icon icon="mdi:bell-outline" width="20" />
            </Button>
            <Dropdown.Menu className="w-72 menu-sm mt-5 z-[1] p-2">
                <li className="p-2 text-center text-zinc-500">
                    {/* <Link href={"#"}>Someone mentioned </Link> */}
                    No notifications
                </li>

                {/* <li className="mt-4">
                    <Button color="accent" size="sm">
                        Mark all as read
                    </Button>
                </li> */}
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default NotificationNavItem;
