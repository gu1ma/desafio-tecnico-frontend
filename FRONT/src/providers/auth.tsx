import React, { ReactNode, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type UserType = {
    logged: Boolean,
    token: String,
}

type UserContextType = {
    user: UserType
    setUser: React.Dispatch<SetStateAction<any>>
}

type UserContextProps = {
    children: ReactNode
}

const initalValues = {
    user: { logged: false, token: '' },
    setUser: () => {},
}

export const AuthContext = React.createContext<UserContextType>(initalValues);

export const AuthProvider = ({ children }: UserContextProps) => {
    const [user, setUser] = useState(initalValues.user)
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('@userLoggedToken');
        setUser({ logged:  token != null, token: token ? atob(token) : '' })
        if(user.logged) {
            navigate('/dash');
            return;
        }
        navigate('/login');
    }, [user.logged, navigate])

    return (
        <AuthContext.Provider value={{ user, setUser }}>
            { children }
        </AuthContext.Provider>
    )
}