import React, { useCallback, useState } from "react";
import * as auth from "auth-provider";
import { User } from "screens/project-list/search-panel";
import { ReactNode } from "react";
import { http } from "utils/http";
import { useMount } from "utils";
import { useAsync } from "utils/use-async";
import { FullPageErrorFallback, FullPageLoading } from "components/lib";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { selectUser, bootstrap } from "store/auth.slice";
import * as authStore from "store/auth.slice";

// const AuthContext = React.createContext<
//   | {
//     user: User | null;
//     register: (form: AuthForm) => Promise<void>;
//     login: (form: AuthForm) => Promise<void>;
//     logout: () => Promise<void>;
//   }
//   | undefined
// >(undefined);
// AuthContext.displayName = "AuthContext";

export interface AuthForm {
  username: string;
  password: string;
}

export const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const {
    data: user,
    error,
    isLoading,
    isIdle,
    isError,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // const [user, setUser] = useState<User | null>(null);

  // const login = (form: AuthForm) => auth.login(form).then(setUser);

  // const register = (form: AuthForm) => auth.register(form).then(setUser);

  // const logout = () => auth.logout().then(() => setUser(null));
  const dispatch: (...args: any[]) => Promise<User> = useDispatch();

  useMount(() => {
    run(dispatch(bootstrap()));
    // bootstrapUser().then(setUser)
  });

  if (isIdle || isLoading) {
    return <FullPageLoading></FullPageLoading>;
  }

  if (isError) {
    return <FullPageErrorFallback error={error}></FullPageErrorFallback>;
  }

  return <div>{children}</div>;
};

export const useAuth = () => {
  const dispatch: (...args: any[]) => Promise<User> = useDispatch();
  // const dispatch = useDispatch()
  const user = useSelector(selectUser);

  const login = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch],
  );
  const register = useCallback(
    (form: AuthForm) => dispatch(authStore.login(form)),
    [dispatch],
  );
  const logout = useCallback(() => dispatch(authStore.logout()), [dispatch]);

  return {
    user,
    login,
    register,
    logout,
  };
  // const context = React.useContext(AuthContext);
  // if (!context) {
  //   throw new Error("useAuth必须在AuthProvider中使用");
  // }
  // return context;
};
