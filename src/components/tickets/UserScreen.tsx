import React, { useEffect, useState } from "react";
import { useUserId } from "../../hooks";
import { fallbackPhotoUrl } from "../../pages/app/admin/account";
import { user } from "../../types";
import { Firestore } from "../../utils/firebase";
import Button from "./Button";
import Heading from "./Heading";
import Subheading from "./Subheading";
import Text from "./Text";

interface userScreenProps {
  uid: string;
}

const UserScreen: React.FC<userScreenProps> = ({ uid }) => {
  const [user, userLoading] = useUserId(uid);
  const [editMode, setEditMode] = useState(false);
  const [localUser, setLocalUser] = useState<user>(user);

  useEffect(() => {
    if (user) {
      setLocalUser(user);
    }
  }, [user]);

  const updateUser = (updatedUser: user) => {
    if (updatedUser) {
      Firestore.collection("users").doc(user?.email).update(updatedUser);
    }
  };

  const permissionsStr = user?.permissions
    ? user.permissions === "admin"
      ? "Administrador"
      : "Usuario"
    : "";
  const lastLoginStr = user?.lastLogin
    ? new Date(user.lastLogin).toDateString() +
      " - " +
      new Date(user.lastLogin).toLocaleTimeString()
    : "Nunca";
  const departmentsStr = user?.departments
    ? user.departments.length !== 0
      ? user.departments.join(", ")
      : "Ningun departamento"
    : "Ningun departamento";

  return (
    <div className="flex flex-col space-y-8">
      <Heading>Informacion de usuario</Heading>
      {!userLoading ? (
        <>
          {user ? (
            <>
              <div className="h-48 w-48 relative">
                <img
                  alt="Foto de perfil"
                  className="rounded-full h-48 w-48"
                  src={user?.photoUrl || fallbackPhotoUrl}
                />
                <button className="absolute flex items-center justify-center bottom-0 right-0 h-12 w-12 rounded-full bg-lightBlue transition-transform transform hover:scale-110 cursor-pointer">
                  <span className="material-icons text-white opacity-90">
                    edit
                  </span>
                </button>
              </div>
              <div className="flex space-x-24">
                <div className="flex flex-col space-y-4">
                  <div>
                    <Subheading>Nombre</Subheading>
                    {editMode ? (
                      <input
                        className="font-poppins text-darkBlue text-xl border border-b-lightBlue"
                        value={localUser?.displayName || ""}
                        onChange={({ target }) => {
                          // eslint-ignore-next-line
                          //@ts-ignore
                          setLocalUser({
                            ...localUser,
                            displayName: target.value,
                          });
                        }}
                      />
                    ) : (
                      <Text>{user?.displayName}</Text>
                    )}
                  </div>
                  <div>
                    <Subheading>Correo</Subheading>
                    <Text>{user?.email}</Text>
                  </div>
                  <div>
                    <Subheading>Ultimo Inicio de Sesión</Subheading>
                    <Text>{lastLoginStr}</Text>
                  </div>
                </div>
                <div className="flex flex-col space-y-4">
                  <div>
                    <Subheading>Departamentos</Subheading>
                    <Text>{departmentsStr}</Text>
                  </div>
                  <div>
                    <Subheading>Permisos</Subheading>
                    {editMode ? (
                      <select
                        className="font-poppins text-darkBlue text-xl"
                        value={localUser?.permissions || ""}
                        onChange={({ target }) => {
                          setLocalUser({
                            ...localUser,
                            // @ts-ignore
                            permissions: target.value,
                          });
                        }}
                      >
                        <option value="admin">Administrador</option>
                        <option value="user">Usuario</option>
                      </select>
                    ) : (
                      <Text>{permissionsStr}</Text>
                    )}
                  </div>
                  <div>
                    <Subheading>ID de Usuario</Subheading>
                    <Text>{user?.uid}</Text>
                  </div>
                </div>
              </div>
              <div className="flex space-x-4 items-center">
                {editMode ? (
                  <>
                    <Button
                      normalWidth
                      dark
                      onClick={() => {
                        setEditMode(false);
                        updateUser(localUser);
                      }}
                    >
                      Guardar Cambios
                    </Button>
                    <Button
                      normalWidth
                      onClick={() => {
                        setEditMode(false);
                        setLocalUser(user);
                      }}
                    >
                      Cancelar
                    </Button>
                  </>
                ) : (
                  <Button normalWidth onClick={() => setEditMode(true)}>
                    Editar Informacion
                  </Button>
                )}
              </div>
            </>
          ) : (
            <div>
              <Subheading>Usuario no encontrado</Subheading>
              <Text>No hemos podido encontrar al usuario con ID {uid}</Text>
            </div>
          )}
        </>
      ) : (
        <div className="spinner-1"></div>
      )}
    </div>
  );
};

export default UserScreen;
