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
    }, [id])

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
      <div className="flex items-center h-screen">
        <form onSubmit={handleSubmit(onSubmit)} className="mx-auto min-w-lg bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4">Editar Usuário</h2>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm font-medium text-gray-700">Username</label>
          <input
              {...register("username", { required: "Username is required" })}
              className="w-full p-2 border-2 border-slate-300 rounded-md outline-none focus:border-slate-500"
              placeholder="examplejs"
              type="text"
              id="username"
          />
          {errors.username && <p className="text-red-600 text-xs">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium text-gray-700">Age</label>
          <input
              {...register("age", { required: "Age is required" })}
              className="w-full p-2 border-2 border-slate-300 rounded-md outline-none focus:border-slate-500"
              placeholder="20"
              type="number"
              id="age"
          />
          {errors.age && <p className="text-red-600 text-xs">{errors.age.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Ativo</label>
          <Controller
              control={control}
              name="isActive"
              rules={{ required: "This field is required" }}
              defaultValue="false"
              render={({ field }) => (
                  <IOSSwitch
                      checked={field.value === "true"}
                      onChange={(ev) => field.onChange(ev.target.checked ? "true" : "false")}
                  />
              )}
          />
          {errors.isActive && <p className="text-red-600 text-xs">{errors.isActive.message}</p>}
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
          <input
              {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Invalid email address" } })}
              className="w-full p-2 border-2 border-slate-300 rounded-md outline-none focus:border-slate-500"
              placeholder="example@example.com"
              type="email"
              id="email"
          />
          {errors.email && <p className="text-red-600 text-xs">{errors.email.message}</p>}
        </div>
        <div className="flex justify-between">
          <button
              type="submit"
              className="w-full py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
              Editar Usuário
          </button>
        </div>
        <div className="mt-4 text-center">
          <Link to="/" className="text-blue-500 hover:underline">Voltar</Link>
        </div>
        </form>
      </div>
    )
}