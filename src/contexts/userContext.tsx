import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import React from "react";
import axios from "axios";
import { User } from "../utils/types";
import apiClient from "../utils/apiClient";

type UserContextType = {
  user: User | null;
  token: string | null;
  registerUser: (email: string, name: string, password: string) => void;
  loginUser: (email: string, password: string) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

type Props = { children: React.ReactNode };

const UserContext = createContext<UserContextType>({} as UserContextType);

export const UserProvider = ({ children }: Props) => {
  const navigate = useNavigate();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (user && token) {
      setUser(user);
      setToken(token);
      axios.defaults.headers.common["Authorization"] = "Bearer " + token;
    }
    setIsReady(true);
  }, []);


  const registerUser = async (
    email: string,
    name: string,
    password: string
  ) => {

    apiClient.post('/auth/register', {email, name, password})
      .then(res => {
        toast.success('You have registered successfully, kindly verify your email');
        console.log(res.data)
        navigate('/login');
        
      })
      .catch((errors: any) => toast.warning(errors.response.data.message));
  };

  const loginUser = async (email: string, password: string) => {
    apiClient.post('/auth/login', {email, password})
      .then(res => {
        if (res) {
          console.log(res);
            const userObj = {
                id: res?.data.user.id,
                email: res?.data.user.email,
                name: res?.data.user.name,
                role: res?.data.user.role,
                isEmailVerified: res?.data.user.isEmailVerified
            };
            setToken(res?.data.tokens.access.token);
            setUser(userObj!);
            toast.success("Login Success!");
            navigate("/");
          }
        })
      .catch((errors) => toast.error(errors.response.data.message));
  };

  const isLoggedIn = () => {
    return !!user;
  };

  const logout = () => {
    setUser(null);
    setToken("");
    navigate("/");
  };

  return (
    <UserContext.Provider
      value={{ loginUser, user, token, logout, isLoggedIn, registerUser }}
    >
      {isReady ? children : null}
    </UserContext.Provider>
  );
};

export const UserConsumer = () => React.useContext(UserContext);