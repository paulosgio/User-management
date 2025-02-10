import { Controller, useForm } from "react-hook-form";
import { Link, useNavigate, useParams } from "react-router-dom";
import { instance } from "../../instance/instance";
import useUser from "../../context/useUser";
import { useEffect } from "react";
import { IOSSwitch } from "../Home/components/Form/switch";

interface IFormProps {
    username: string,
    age: number,
    isActive: string,
    email: string,
    id: string
  }

export default function UserEdit() {
    
    const { id } = useParams< { id: string } >()
    const { control, register, handleSubmit, formState: { errors }, setValue } = useForm<IFormProps>()
    const { dispatch } = useUser()
    const navigate = useNavigate()

    useEffect(()=> {
        const fetch = async ()=> {
            const response = await instance.get(`users/${id}`)
            const user: IFormProps = response.data
            setValue("username", user.username)
            setValue("isActive", user.isActive)
            setValue("email", user.email)
            setValue("age", user.age)
        }
        fetch()
    }, [])

    const onSubmit = async (newUser: IFormProps)=> {
        try {
          const response = await instance.put(`users/${id}`, newUser)
          dispatch({ type: "EDIT", payload: response.data})
          navigate("/")
        } catch (error) {
          console.log(error);
        }
      } 

    return(
       <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input {...register("username", { required: true })} className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="examplejs" type="text" id="username"/>
              {errors.username && <p className="text-red-600">Username is required</p>}
            <label htmlFor="username">Age</label>
            <input {...register("age")} className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="20" type="text" id="age"/>
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
            <label htmlFor="username">Email</label>
            <input {...register("email")} className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="example@example.com" type="email" id="email"/>
              {errors.email && <p className="text-red-600">email is required</p>}
              <button type="submit">Editar usuario</button>
              <Link to="/">Voltar</Link>
          </form>
    )
}