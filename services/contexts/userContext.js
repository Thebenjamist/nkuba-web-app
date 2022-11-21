import React, { createContext, useState, useEffect } from "react";

export const UserContext = createContext();
import cookie from "js-cookie";

import { checkSession } from "../api/users";
import clear from "../../utils/helpers/auth/clearCookies";

const UserProvider = ({ children }) => {
  const [session, setSession] = useState("loading");

  const getSession = async () => {
    const data = {
      token: cookie.get("nkuba-access-token"),
    };
    checkSession({ data })
      .then((res) => {
        const ses = res.data.UserAttributes;

        var result = {};
        for (var i = 0; i < ses?.length; i++) {
          result[ses[i]?.Name] = ses[i]?.Value;
        }
        const params = {
          ...res?.data?.user,
          ...result,
        };
        setSession(params);
      })
      .catch((err) => {
        clear();
        setSession(false);
      });
  };

  useEffect(() => {
    getSession();
  }, []);

  return (
    <UserContext.Provider value={{ session, setSession, getSession }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
