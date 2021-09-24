import React from "react";
import { useUser } from "../../hooks";
import { fallbackPhotoUrl } from "../../pages/app/admin/account";
import { Text } from ".";

interface UserProps {
  email: string | undefined;
}

const User: React.FC<UserProps> = ({ email }) => {
  const [user] = useUser(email);

  return (
    <div className="flex items-center space-x-1">
      <img
        alt={user?.displayName || "Nothing"}
        src={user?.photoUrl || fallbackPhotoUrl}
        className="rounded-full h-7 w-7"
      />
      <Text>{user?.displayName}</Text>
    </div>
  );
};

export default User;
