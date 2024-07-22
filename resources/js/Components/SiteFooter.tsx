import React from "react";
import { Footer } from "react-daisyui";

const SiteFooter = () => {
    return (
        <Footer className="p-10 bg-neutral text-neutral-content">
            <div>
                <img src="/logo.svg" alt="logo" className="w-[80px] h-[80px]" />
                <div className="text-xl font-bold">Delisho</div>
            </div>

            <div>
                <Footer.Title>Help</Footer.Title>
                <a className="link link-hover">Category request</a>
                <a className="link link-hover">Feedback</a>
            </div>
        </Footer>
    );
};

export default SiteFooter;
