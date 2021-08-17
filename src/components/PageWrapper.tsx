import React from "react";
import { createContext } from "react";
import { userData } from "../hooks/useUser";

interface pageWrapperProps {
  userData: userData;
}
export const UserDataContext = createContext<userData>([null, false, () => {}]);

const PageWrapper: React.FC<pageWrapperProps> = ({ children, userData }) => {
  return (
    <UserDataContext.Provider value={userData}>
      <div className="px-24 pt-10 overflow-y-auto">{children}</div>
    </UserDataContext.Provider>
  );
};

export default PageWrapper;
