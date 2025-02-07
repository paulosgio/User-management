interface IInputProp {
    placeholder: string,
    type: string,
    id: string
}

export default function Input({ placeholder, id, type }: IInputProp) {
    return (
        <input className="py-2 px-3 border-2 border-slate-200 rounded-2xl outline-none focus:border-slate-400" placeholder={placeholder} type={type} id={id}/>
    )
}