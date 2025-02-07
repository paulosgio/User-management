import { Controller, useForm } from "react-hook-form"
import Input from "../Input"
import ButtonForm from "../ButtonForm"

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
            <Input {...register("username", { required: true })} placeholder="examplejs" type="text" id="username"/>
              {errors.username && <p className="text-red-600">Username is required</p>}
            <label htmlFor="username">Age</label>
            <Input {...register("age", { required: true })} placeholder="20" type="text" id="age"/>
              {errors.age && <p className="text-red-600">Age is required</p>}
            <h2>isActive</h2>
            <Controller
              name="isActive"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="username">yes</label>
                  <input className="w-fit" checked={field.value === "yes"} onChange={field.onChange} value="yes" type="radio" id="isActive"/>
                  <label htmlFor="username">no</label>
                  <input className="w-fit" checked={field.value === "no"} onChange={field.onChange} value="no" type="radio" id="isInactive"/>
                    {errors.isActive && <p className="text-red-600">check some option</p>}
                </>
              )}
            />
            <label htmlFor="username">Email</label>
            <Input {...register("email", { required: true })} placeholder="example@example.com" type="email" id="email"/>
              {errors.email && <p className="text-red-600">email is required</p>}
            <ButtonForm type="submit">
                Adicionar usuario
            </ButtonForm>
          </form>
    )
}