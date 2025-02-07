import React from "react";
import { IoPersonAddOutline } from "react-icons/io5";

interface IButtonProp {
    children: React.ReactNode,
    type?: "submit" | "button" | "reset",
    onClick?: ()=> {}
}


export default function ButtonForm({ children, type }: IButtonProp) {
    return (
        <button className="flex items-center gap-4 bg-slate-700 w-fit px-2 py-3 rounded-2xl text-white" type={type}>
            {children}
            <IoPersonAddOutline/>
        </button>
    )
}