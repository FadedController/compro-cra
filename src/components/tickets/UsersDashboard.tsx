import React, { useEffect } from "react";
import { useState } from "react";
import useAdminUsers from "../../hooks/useAdminUsers";
import { permissions, user } from "../../types";
import Text from "./Text";
import UserRedirect from "./UserRedirect";

interface usersDashboardProps {
  permissions: permissions[];
}

const UsersDashboard: React.FC<usersDashboardProps> = ({ permissions }) => {
  const [limit, setLimit] = useState(25);
  const [dbUsers, dbUsersLoading] = useAdminUsers({ limit, permissions });
  const [searchQuery, setSearchQuery] = useState("");
  const [users, setUsers] = useState<user[]>(dbUsers);

  useEffect(() => {
    if (!dbUsersLoading && !!dbUsers.length) {
      setUsers(
        dbUsers.sort((a, b) => {
          if (
            (a?.displayName || "no registrado") >
            (b?.displayName || "no registrado")
          )
            return 1;
          if (
            (a?.displayName || "no registrado") <
            (b?.displayName || "no registrado")
          )
            return -1;
          return 0;
        })
      );
    }
  }, [dbUsers, dbUsersLoading]);

  return (
    <div className="w-full bg-darkBlue rounded-xl shadow-xl pt-4 overflow-hidden">
      <div className="flex px-6">
        <div className="border flex flex-1 items-center border-white rounded-full px-4 py-2 opacity-60">
          <span className="material-icons text-white">search</span>
          <input
            className="bg-transparent h-full w-full px-2 text-white"
            value={searchQuery}
            onChange={({ target }) => setSearchQuery(target.value)}
            placeholder="Escribe una búsqueda"
          />
        </div>
      </div>
      <div className="bg-white mt-2 overflow-x-auto min-h-96">
        <table className="w-full font-poppins rounded-xl bg-white">
          <thead>
            <tr className="bg-darkBlue">
              <th className="text-left text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <button className="flex items-center">
                  <p>Nombre</p>
                  <span
                    className={`material-icons transition-transform transform`}
                  >
                    expand_more
                  </span>
                </button>
              </th>
              <th className="text-left text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <button className="flex items-center">
                  <p>Correo</p>
                  <span
                    className={`material-icons transition-transform transform `}
                  >
                    expand_more
                  </span>
                </button>
              </th>
              <th className="text-left text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <button className="flex items-center">
                  <p>ID de Usuario</p>
                  <span
                    className={`material-icons transition-transform transform`}
                  >
                    expand_more
                  </span>
                </button>
              </th>
              <th className="text-center text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <button className="w-full flex items-center justify-center">
                  <p>Permisos</p>
                  <span
                    className={`material-icons transition-transform transform`}
                  >
                    expand_more
                  </span>
                </button>
              </th>
              <th className="text-center text-sm font-light text-white opacity-60 2xl:px-8 px-4 pb-2">
                <button className="w-full flex items-center justify-center">
                  <p>Departamentos</p>
                  <span
                    className={`material-icons transition-transform transform`}
                  >
                    expand_more
                  </span>
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {dbUsersLoading ? (
              <tr className="mt-2">
                <td colSpan={5} className="h-96 bg-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="spinner-1"></div>
                  </div>
                </td>
              </tr>
            ) : !!users.length ? (
              users.map((user, idx) => {
                const isTop = idx === 0 ? true : false;
                const isBottom = users.length - 1 === idx ? true : false;
                const departmentsStr = user?.departments
                  ? user.departments.length !== 0
                    ? user.departments.join(", ")
                    : "Ninguno"
                  : "Ninguno";
                return (
                  <tr
                    className={`bg-white cursor-default mt-2 rounded-xl ${
                      isTop && "rounded-t-xl"
                    } ${isBottom && "rounded-b-xl"}`}
                    key={idx}
                  >
                    <td className="border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      <UserRedirect
                        className="hover:bg-gray-200 rounded-xl transition-colors 2xl:px-8 px-4"
                        name
                        email={user?.email}
                      />
                    </td>
                    <td className="2xl:px-8 px-4 border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      {user?.email || "No registrado"}
                    </td>
                    <td className="2xl:px-8 px-4 border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      {user?.uid || "No registrado"}
                    </td>
                    <td className="2xl:px-8 px-4 py-2 text-center border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      {user?.permissions === "admin"
                        ? "Administrador"
                        : "Usuario"}
                    </td>
                    <td className="2xl:px-8 px-4 py-2 text-center border text-base font-light text-darkBlue border-b-lightBlue border-r-white">
                      {departmentsStr}
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5} className="h-96 bg-white">
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="max-w-lg text-center opacity-90">
                      <Text>
                        No hemos encontrado ningun ticket que contenga los
                        parameteros de tu busqueda
                      </Text>
                    </div>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="w-full bg-darkBlue py-3 px-12 flex space-x-16 justify-end">
        <div className="flex items-center space-x-4">
          <p className="text-left text-sm font-light text-white opacity-60">
            Elementos por página:
          </p>
          <select
            value={limit}
            onChange={({ target }) => setLimit(parseInt(target.value))}
            className="px-2 flex items-center justify-center py-1 rounded-full text-sm bg-lightBlue text-white"
          >
            <option value={"10"}>10</option>
            <option value={"25"}>25</option>
            <option value={"50"}>50</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UsersDashboard;
