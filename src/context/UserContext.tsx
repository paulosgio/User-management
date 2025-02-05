import React, { createContext, ReactNode, useReducer } from "react"

interface IFormProps {
    username: string,
    age: number,
    isActive: string,
    email: string,
    id: string
}
  
interface IUserProviderProps {
      children: ReactNode
}

type Action = 
    { type: "ADD", payload: IFormProps } |
    { type: "EDIT", payload: IFormProps } |
    { type: "DELETE", payload: IFormProps } |
    { type: "GET", payload: IFormProps[] }
  
type State = IFormProps[]

type UserContextType = {
    state: State,
    dispatch: React.Dispatch<Action>
}

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

  const initialState: State = []

export const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: IUserProviderProps) {

    const [state, dispatch] = useReducer(reducer, initialState)

    return(
        <UserContext.Provider value={{state, dispatch}}>
            { children }
        </UserContext.Provider>
    )
}

