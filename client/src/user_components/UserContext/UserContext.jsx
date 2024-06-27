import React, { createContext, useState ,useEffect} from "react";


export const UserContext = createContext({
    user: {
        id: "",
        first_name: "",
        last_name: "",
        user_name: "",
        email: "",
        password: "",
        date_of_birth: "",
        phone_number: ""
      },
    setUser:(user)=>{}
});
export default function UserContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem("user");
        return storedUser ? JSON.parse(storedUser) : {
          id: "",
          first_name: "",
          last_name: "",
          user_name: "",
          email: "",
          password: "",
          date_of_birth: "",
          phone_number: ""
        };
      });
    
      useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
      }, [user]);
    
    return(
        <UserContext.Provider value={{user,setUser}}>{children}</UserContext.Provider>
    )
}

