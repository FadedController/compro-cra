import React from "react";
import { Link } from "react-router-dom";

const NewTicket: React.FC = () => {
  return (
    <Link to="/app/user/new">
      <div className="fixed bg-darkBlue cursor-pointer bottom-4 right-2 flex items-center justify-center h-16 w-16 rounded-full">
        <span className="material-icons text-white text-4xl">add</span>
      </div>
    </Link>
  );
};

export default NewTicket;
