import React, { PropsWithChildren, createContext, useContext, useState } from "react";

type UserType = {
  cpfUser: string;
  nomeUser: string;
  sobrenomeUser: string;
  telefoneUser: string;
  dataNascimentoUser: string;
  emailUser: string;
};

type UserContextType = {
  user: UserType | null; 
  setUser: (userData: UserType) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: PropsWithChildren<{}>) => {
  const [user, setUserState] = useState<UserType | null>(null);
  const setUser = (userData: UserType) => setUserState(userData);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useBasicUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useBasicUser deve estar dentro de BasicUserProvider");
  }
  return context;
};
