import { Controller, useForm } from "react-hook-form"
import Title from "./Components/Title"
import { instance } from "./instance/instance"
import { useEffect, useReducer } from "react"

interface IFormProps {
  username: string,
  age: number,
  isActive: string,
  email: string,
  id: string
}

type Action = 
  { type: "ADD", payload: IFormProps } |
  { type: "EDIT", payload: IFormProps } |
  { type: "DELETE", payload: IFormProps } |
  { type: "GET", payload: IFormProps[] }

type State = IFormProps[]

function reducer(state: State, action: Action): IFormProps[] {
  switch (action.type) {
    case "ADD":
      return [...state, action.payload]
    case "EDIT":
      return state.map(user => user.id === action.payload.id ? action.payload : user)
    case "DELETE":
      return state.filter(user => user.id !== action.payload.id)
    case "GET":
      return action.payload
    default:
      return state
  }
}

const initialState: IFormProps[] = []

function App() {

  const { control, register, handleSubmit, formState: { errors } } = useForm<IFormProps>()

  const onSubmit = async (data: IFormProps)=> {
    try {
      const response = await instance.post("users", data)
      { dispatch({type: "ADD", payload: response.data}) }
    } catch (error) {
      console.log(error);
    }
  }

  const deleteUser = async (id: string)=> {
    try {
        await instance.delete(`users/${id}`)
        dispatch({ type: "DELETE", payload: { id } as IFormProps })
    } catch (error) {
      console.log(error);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(()=> {
    const fetchUsers = async ()=> {
      try {
        const response = await instance.get("users")
        dispatch({ type: "GET", payload: response.data })
      } catch (error) {
        console.log(error);
      }
    }
    fetchUsers()
  }, [])

  return (
    <>
      <Title style="text-center mt-3">User Management</Title>
      <div className="flex">
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input {...register("username", { required: true })} className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="examplejs" type="text" id="username"/>
              {errors.username && <p className="text-red-600">Username is required</p>}
            <label htmlFor="username">Age</label>
            <input {...register("age")} className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="20" type="text" id="age"/>
              {errors.age && <p className="text-red-600">Age is required</p>}
            <h2>isActive</h2>
            <Controller
              name="isActive"
              control={control}
              rules={{ required: true }}
              render={({ field }) => (
                <>
                  <label htmlFor="username">yes</label>
                  <input className="border-2 border-slate-400 outline-none hover:border-slate-500 w-fit" checked={field.value === "yes"} onChange={field.onChange} value="yes" type="radio" id="isActive"/>
                  <label htmlFor="username">no</label>
                  <input className="2 border-slate-400 outline-none hover:border-slate-500 w-fit" checked={field.value === "no"} onChange={field.onChange} value="no" type="radio" id="isInactive"/>
                    {errors.isActive && <p className="text-red-600">check some option</p>}
                </>
              )}
            />
            <label htmlFor="username">Email</label>
            <input {...register("email")} className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="example@example.com" type="email" id="email"/>
              {errors.email && <p className="text-red-600">email is required</p>}
              <button type="submit">Adicionar usuario</button>
          </form>
        </div>
        <div>
          {state.map((user)=> {
            return(
              <>
                <h1>{user.username}</h1>
                <p>{user.isActive}</p>
                <p>{user.email}</p>
                <p>{user.age}</p>
                <button onClick={()=> deleteUser(user.id)}>Excluir</button>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default App
