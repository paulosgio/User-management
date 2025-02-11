import { instance } from "../../instance/instance"
import { useEffect, useState } from "react"
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
  const [searchTerm, setSearchTerm] = useState("")

  const onSubmit = async (data: IFormProps) => {
    try {
      const response = await instance.post("users", data)
      dispatch({ type: "ADD", payload: response.data })
    } catch (error) {
      console.log(error)
    }
  }

  const deleteUser = async (id: string) => {
    try {
      await instance.delete(`users/${id}`)
      dispatch({ type: "DELETE", payload: { id } as IFormProps })
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await instance.get("users")
        dispatch({ type: "GET", payload: response.data })
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value)
  }

  const filteredUsers = state.filter(user => {
    if (searchTerm === "") {
      return true
    } else {
      return(
        user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }
  }
  )

  return (
    <>
      <div className="grid grid-cols-2 h-screen">
        <Form onSubmit={onSubmit} />
        <div className="overflow-y-auto max-h-screen w-full rounded-lg border border-gray-300">
          <div className="p-4">
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Buscar usuário..."
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
            />
          </div>
          <table className="bg-white w-full">
            <thead className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal sticky top-0 z-10">
              <tr>
                <th className="p-8 text-left">Username</th>
                <th className="p-8 text-left">Status</th>
                <th className="p-8 text-left">Email</th>
                <th className="p-8 text-left">Age</th>
                <th className="p-8 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {filteredUsers.map(user => (
                <tr key={user.id} className="border-b hover:bg-gray-100 transition duration-150">
                  <td className="py-3 px-6 max-w-3xs truncate">{user.username}</td>
                  <td className="py-3 px-6">
                    {user.isActive === "true" ? (
                      <span className="bg-green-100 text-green-700 py-1 px-3 rounded-full text-xs">Active</span>
                    ) : (
                      <span className="bg-red-100 text-red-700 py-1 px-3 rounded-full text-xs">Inactive</span>
                    )}
                  </td>
                  <td className="py-3 px-6 max-w-xs truncate">{user.email}</td>
                  <td className="py-3 px-6">{user.age}</td>
                  <td className="py-3 px-6 flex items-center space-x-2 whitespace-nowrap">
                    <button
                      onClick={() => deleteUser(user.id)}
                      className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded text-xs"
                    >
                      Excluir
                    </button>
                    <Link to={`user/${user.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded text-xs">
                        Editar
                      </button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Home
