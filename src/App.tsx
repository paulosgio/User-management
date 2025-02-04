import Title from "./Components/Title"

function App() {
  return (
    <>
      <Title style="text-center mt-3">User Management</Title>
      <div className="flex">
        <div>
          <form className="flex flex-col">
            <label htmlFor="username">Username</label>
            <input className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="examplejs" type="text" id="username"/>
            <label htmlFor="username">Age</label>
            <input className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="20" type="text" id="username"/>
            <label htmlFor="username">isActive</label>
            <input className="border-2 border-slate-400 rounded-md outline-none hover:border-slate-500 w-fit" type="checkbox" id="isActive"/>
            <label htmlFor="username">isInactive</label>
            <input className="border-2 border-slate-400 rounded-md outline-none hover:border-slate-500 w-fit" type="checkbox" id="isInactive"/>
            <label htmlFor="username">Age</label>
            <input className="p-1 border-2 border-slate-400 rounded-md outline-none focus:border-slate-500" placeholder="20" type="text" id="username"/>
          </form>
        </div>
        <div></div>
      </div>
    </>
  )
}

export default App
