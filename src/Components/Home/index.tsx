import { instance } from "../../instance/instance"
import { useEffect } from "react"
import { Link } from "react-router-dom"
import useUser from "../../context/useUser"
import Form from "./components/Form"

interface IFormProps {
  username: string,
  age: number,
  isActive: string,
  email: string,
  id: string
}

function Home() {

  const { dispatch, state } = useUser()

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
      <div className="flex">
        <div>
          <Form onSubmit={onSubmit}/>
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
                <Link to={`user/${user.id}`}>
                    <button>Editar</button>
                </Link>
              </>
            )
          })}
        </div>
      </div>
    </>
  )
}

export default Home
