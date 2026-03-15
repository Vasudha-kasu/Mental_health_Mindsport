import React, { createContext, useContext } from "react"
import { useLocalStorage } from "../hooks/useLocalStorage"
import { getAgeGroup } from "../utils/ageUtils"

const defaultUser = {
  age: null,
  ageGroup: null,
  darkMode: false
}

const UserContext = createContext(undefined)

export const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("mental-health-user", defaultUser)

  const setAge = age => {
    const ageGroup = getAgeGroup(age)
    setUser({ ...user, age, ageGroup })
  }

  const toggleDarkMode = () => {
    setUser({ ...user, darkMode: !user.darkMode })
  }

  const resetUser = () => {
    setUser(defaultUser)
  }

  return (
    <UserContext.Provider value={{ user, setAge, toggleDarkMode, resetUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
