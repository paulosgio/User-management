import { Controller, useForm } from "react-hook-form";
import ButtonForm from "../ButtonForm";
import { IOSSwitch } from "./switch";

interface IFormProps {
  username: string;
  age: number;
  isActive: string;
  email: string;
  id: string;
}

interface IFormComponentProp {
  onSubmit: (data: IFormProps) => {};
}

export default function Form({ onSubmit }: IFormComponentProp) {

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormProps>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl p-8 w-full space-y-6"
    >
      <h2 className="text-2xl font-semibold text-gray-700 text-center">User Form</h2>
      <div>
        <label className="block text-gray-600 mb-2" htmlFor="username">Username</label>
        <input
          className="py-2 px-4 w-full border-2 border-slate-200 rounded-lg outline-none focus:border-blue-400 hover:border-blue-300 duration-150"
          {...register("username", { required: true })}
          placeholder="examplejs"
          type="text"
          id="username"
        />
        {errors.username && <p className="text-red-500 text-sm mt-1">Username is required</p>}
      </div>
      <div>
        <label className="block text-gray-600 mb-2" htmlFor="age">Age</label>
        <input
          className="py-2 px-4 w-full border-2 border-slate-200 rounded-lg outline-none focus:border-blue-400 hover:border-blue-300 duration-150"
          {...register("age", { required: true })}
          placeholder="20"
          type="number"
          id="age"
        />
        {errors.age && <p className="text-red-500 text-sm mt-1">Age is required</p>}
      </div>
      <div>
        <h2 className="block text-gray-600 mb-2">Active Status</h2>
        <Controller
          control={control}
          name="isActive"
          rules={{ required: true }}
          defaultValue="false"
          render={({ field }) => (
            <div className="flex items-center space-x-3">
              <IOSSwitch
                checked={field.value === "true"}
                onChange={(ev) => field.onChange(ev.target.checked ? "true" : "false")}
              />
              <span className="text-gray-600">{field.value === "true" ? "Active" : "Inactive"}</span>
            </div>
          )}
        />
      </div>
      <div>
        <label className="block text-gray-600 mb-2" htmlFor="email">Email</label>
        <input
          className="py-2 px-4 w-full border-2 border-slate-200 rounded-lg outline-none focus:border-blue-400 hover:border-blue-300 duration-150"
          {...register("email", { required: true })}
          placeholder="example@example.com"
          type="email"
          id="email"
        />
        {errors.email && <p className="text-red-500 text-sm mt-1">Email is required</p>}
      </div>
      <div className="flex justify-end">
        <ButtonForm type="submit" />
      </div>
    </form>
  );
}
