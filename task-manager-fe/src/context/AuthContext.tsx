import React, { createContext, useState, useMemo } from "react";
import type { User } from "@/model/User.ts";
import {getItemWithExpiry} from "@/utils/storage.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<{
  accessToken: string | null;
  setAccessToken: React.Dispatch<React.SetStateAction<string | null>>;
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}>({
  accessToken: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setAccessToken: () => {}, // default noop
  user: null,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setUser: () => {}, // default noop
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [accessToken, setAccessToken] = useState<string | null>(
    getItemWithExpiry<string>('access_token')
  );
  const [user, setUser] = useState<User | null>(getItemWithExpiry<User>('user'));

  const contextValue = useMemo(
    () => ({ accessToken, setAccessToken, user, setUser }),
    [accessToken, user]
  );

  return (
    <AuthContext value={contextValue}>
      {children}
    </AuthContext>
  );
};
