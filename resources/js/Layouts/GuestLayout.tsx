import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";
import { PropsWithChildren } from "react";
import { Card } from "react-daisyui";

export default function Guest({ children }: PropsWithChildren) {
    return (
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 gap-6">
            <div>
                <Link href="/">
                    <img src="/logo.svg" className="w-[60px]" />
                </Link>
            </div>

            <Card className="p-4 w-full sm:max-w-md bg-zinc-100">
                {children}
            </Card>
        </div>
    );
}
