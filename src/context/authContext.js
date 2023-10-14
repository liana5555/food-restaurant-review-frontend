import React from "react"
import {createContext} from "react"
import axios from "axios"

export const AuthContext = createContext()

export const AuthContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = React.useState(JSON.parse(localStorage.getItem("user"))|| null)


    const login = async(inputs) => {
        const res = await axios.post("/auth/login", inputs)
        setCurrentUser(res.data)
    }

    const logout = async(inputs) => {
        await axios.post("/auth/logout")
        setCurrentUser(null)
    }

    React.useEffect(() => {
        localStorage.setItem("user", JSON.stringify(currentUser))
    }, [currentUser])

    return (
        <AuthContext.Provider value={{currentUser, login, logout, setCurrentUser}}>{children}</AuthContext.Provider>
    )
}