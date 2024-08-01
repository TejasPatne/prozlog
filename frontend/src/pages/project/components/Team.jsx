import React from "react";
import { Link } from "react-router-dom";

const Team = ({ team }) => {
  return (
    <div className="w-full">
      <h2 className="text-xl">Team: </h2>
      <ul className="grid gap-3 md:grid-rows-2 md:grid-cols-2 text-gray-500">
        {team.map((member) => (
          <div className="grid grid-cols-2 md:grid-rows-2 md:grid-cols-1 text-gray-500" key={member._id}> 
            <li> {member.userName} </li>
            <li className="text-yellow-500 underline underline-offset-4"> 
              <Link to={"mailto:" + member.email}>{member.email}</Link>
            </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Team;
