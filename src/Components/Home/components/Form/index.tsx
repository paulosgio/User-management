import { Controller, useForm } from "react-hook-form"
import ButtonForm from "../ButtonForm"
import { IOSSwitch } from "./switch"

interface IFormProps {
    username: string,
    age: number,
    isActive: string,
    email: string,
    id: string
  }

interface IFormComponentProp {
    onSubmit: (data: IFormProps) => {}
}

export default function Form( { onSubmit }: IFormComponentProp ) {

  const { control, register, handleSubmit, formState: { errors } } = useForm<IFormProps>()
    
  return(
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
      <label htmlFor="username">Username</label>
      <input className="py-2 px-3 border-2 border-slate-200 rounded-2xl outline-none focus:border-slate-400 hover:border-slate-400 duration-150" {...register("username", { required: true })} placeholder="examplejs" type="text" id="username"/>
        {errors.username && <p className="text-red-600">Username is required</p>}
      <label htmlFor="age">Age</label>
      <input className="py-2 px-3 border-2 border-slate-200 rounded-2xl outline-none focus:border-slate-400 hover:border-slate-400 duration-150" {...register("age", { required: true, valueAsNumber: true })} placeholder="20" type="text" id="age"/>
        {errors.age && <p className="text-red-600">Age is required</p>}
      <h2>isActive</h2>
      <Controller
        control={control}
        name="isActive"
        rules={{ required: true }}
        defaultValue="false"
        render={({ field })=> (
          <IOSSwitch
            checked={field.value === "true"}
            onChange={(ev)=> field.onChange(ev.target.checked ? "true" : "false")}
          />
        )}
      />
      <label htmlFor="email">Email</label>
      <input className="py-2 px-3 border-2 border-slate-200 rounded-2xl outline-none focus:border-slate-400 hover:border-slate-400 duration-150" {...register("email", { required: true })} placeholder="example@example.com" type="email" id="email"/>
        {errors.email && <p className="text-red-600">email is required</p>}
      <ButtonForm type="submit"/>
    </form>
    )
}