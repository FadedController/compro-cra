import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../hooks";
import { fallbackPhotoUrl } from "../pages/app/admin/account";

interface userRedirectProps {
  email: string | undefined;
}

const UserRedirect: React.FC<userRedirectProps> = ({ email }) => {
  const [user] = useUser(email);
  const [redirect, setRedirect] = useState("");
  return (
    <>
      {redirect && <Redirect to={redirect} />}
      {user && user.uid && (
        <div
          className="flex items-center space-x-2 py-2"
          onClick={() => setRedirect(`/app/admin/users/${user.uid}`)}
        >
          <img
            alt="Foto de perfil"
            className="h-6 w-6 rounded-full"
            src={user?.photoUrl ? user.photoUrl : fallbackPhotoUrl}
          ></img>
          <p className="cursor-pointer">{email}</p>
        </div>
      )}
    </>
  );
};

export default UserRedirect;
