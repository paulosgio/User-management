import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Components/Home"
import UserEdit from "./Components/UserEdit"
import { UserProvider } from "./context/UserContext"

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/user/:id" element={<UserEdit/>}/>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  )
}

export default App
