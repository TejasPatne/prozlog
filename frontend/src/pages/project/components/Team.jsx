import React from "react";

const Team = ({ team }) => {
  return (
    <div>
      <h2 className="text-xl">Team: </h2>
      <ul className="grid grid-rows-2 grid-cols-2 text-gray-500">
        {team.map((member) => (
          <div className="" key={member._id}> 
            <li> {member.userName} </li>
            <li> {member.email} </li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default Team;
