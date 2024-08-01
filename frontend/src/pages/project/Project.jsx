import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Team from "./components/Team";
import Mentors from "./components/Mentors";

const Project = () => {
  const [project, setProject] = useState({
    title: "",
    domain: "",
    description: "",
    video: "ha",
    github: "",
    mentors: [],
    team: [],
  });
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/v1/projects/${id}`);
      const data = await res.json();
      setProject(data.project);
    };
    fetchData();
  }, [id, project.title]);

  return (
    <div className="flex flex-col text-left w-[85%] mt-10 mx-auto">
      <h1 className="text-3xl w-full font-bold">{project.title}</h1>
      <h2> Domain: {project.domain} </h2>
      {/* <div className="grid md:grid-cols-4 place-content-between my-5 gap-5">
        <div className="flex flex-col col-span-3">
            <p className="text-gray-500">{project.description}</p>
            <a href={project.video} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Demo</a>
            <a href={project.github} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Code</a>
        </div>
        <div className="col-span-1">
            <Mentors mentors={project.mentors} />
            <Team team={project.team} />
        </div>
      </div> */}
      <div className="flex flex-col md:flex-row my-5 gap-5">
        <div className="flex flex-col flex-1">
            <p className="text-gray-500">{project.description}</p>
            <a href={project.video} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Demo</a>
            <a href={project.github} className="text-yellow-500 underline underline-offset-4 italic cursor-pointer">Code</a>
        </div>
        <div className="flex-grow-0 col-span-1">
            <Mentors mentors={project.mentors} />
            <Team team={project.team} />
        </div>
      </div>
    </div>
  );
};

export default Project;
