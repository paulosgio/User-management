import { IoPersonAddOutline } from "react-icons/io5";

interface IButtonProp {
    type: "submit" | "button" | "reset",
}

export default function ButtonForm({ type }: IButtonProp) {
    return (
        <button className="flex mt-2 justify-center items-center bg-slate-700 w-[3rem] h-[3rem] px-2 py-3 rounded-full text-white cursor-pointer duration-300 hover:scale-90" type={type}>
            <IoPersonAddOutline/>
        </button>
    )
}