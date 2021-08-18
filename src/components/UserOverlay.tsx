import React from "react";
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useUser } from "../hooks";
import { fallbackPhotoUrl } from "../pages/app/admin/account";
import Button from "./Button";
import Subheading from "./Subheading";
import Text from "./Text";

interface userOverlayProps {
  email: string | undefined;
}

const UserOverlay: React.FC<userOverlayProps> = ({ email }) => {
  const [user] = useUser(email);
  const [overlayState, setOverlayState] = useState(false);
  const [redirect, setRedirect] = useState("");
  return (
    <div className="relative">
      {redirect && <Redirect to={redirect} />}
      {overlayState && (
        <div className="absolute top-10 left-0 w-72 overflow-x-auto flex flex-col space-y-2 bg-gray-50 shadow-xl rounded-xl border border-lightBlue z-30 px-4 py-2">
          <div>
            <Subheading>Nombre</Subheading>
            <Text>{user?.displayName}</Text>
          </div>
          <Button
            onClick={() => setRedirect(`/app/admin/users/${user?.uid}`)}
            dark
          >
            Ir a perfil
          </Button>
        </div>
      )}
      <div
        className="flex items-center space-x-2 py-2"
        onClick={() => setOverlayState(!overlayState)}
      >
        <img
          alt="Foto de perfil"
          className="h-6 w-6 rounded-full"
          src={user?.photoUrl ? user.photoUrl : fallbackPhotoUrl}
        ></img>
        <p className="cursor-pointer">{email}</p>
      </div>
    </div>
  );
};

export default UserOverlay;
