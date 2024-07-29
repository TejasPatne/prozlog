import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Project from "../models/projectModel.js";
import User from "../models/userModel.js";

export const create = async (req, res) => {
    let project = req.body;

    if(!project.title || !project.domain || !project.description){
        return res.status(400).json({
            success: false,
            message: "Please fill the required fields"
        });
    }

    if(project.title.length < 10 || project.title.length > 150){
        return res.status(400).json({
            success: false,
            message: "Title must be between 10 and 150 characters"
        });
    }

    if(project.mentors.length > 2 || project.team.length > 4){
        return res.status(400).json({
            success: false,
            message: "Maximum of 2 mentors and 4 team members allowed"
        });
    }

    if(project.team.length !== 0){
        const teamMembers = await User.find({
            email: {
                $in: project.team
            }
        });
        
        if(teamMembers.length !== project.team.length){
            return res.status(400).json({
                success: false,
                message: "Team members not found"
            });
        }
        project.team = teamMembers;
    }

    try {
        if(!req.cookies.token) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

        const newProject = await Project.create(project);
        
        return res.status(200).json({
            success: true,
            message: "Project added successfully!",
            project: newProject
        })

    } catch (error) {
        console.log("Error in projectController (create)", error.message);
        return res.status(500).json({
            succes: false,
            message: "Internal Server Error"
        });
    }
}

export const remove = async (req, res) => {
    const { id } = req.params;
    try {
        if(!req.cookies.token) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

        await Project.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully!"
        })
    } catch (error) {
        console.log("Error in projectController (remove)", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const update = async (req, res) => {
    const { id } = req.params;
    const project = req.body;
    try {
        if(!req.cookies.token) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });
        const validate = jwt.verify(req.cookies.token, JWT_SECRET);
        if(!validate) return res.status(401).json({
            success: false,
            message: "Unauthorized"
        });

        if(Object.entries(project).length === 0) return res.status(400).json({
            success: false,
            message: "No field was provided for update"
        })
        
        const existingProject = await Project.findById(id);
        if(!existingProject) return res.status(400).json({
            success: false,
            message: "Project not found. Please create a new project"
        });

        if(project.team && project.team.length !== 0){
            const teamMembers = await User.find({
                email: {
                    $in: project.team
                }
            });
            if(teamMembers?.length !== project.team.length){
                return res.status(400).json({
                    success: false,
                    message: "Team members not found. Please provide valid email of all team members"
                });
            }
            project.team = teamMembers;
        }

        const updatedProject = await Project.findByIdAndUpdate(id, {
            existingProject, ...project
        }, { new: true });

        return res.status(200).json({
            success: true,
            message: "Project updated successfully!",
            project: updatedProject
        });

    } catch (error) {
        console.log("Error in projectControler (update)", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getProject = async (req, res) => {
    const { id } = req.params;

    try {
        const project = await Project.findById(id).populate("team");
        if(!project) return res.status(400).json({
            success: false,
            message: "Project not found"
        })
        return res.status(200).json({
            success: true,
            project
        })
    } catch (error) {
        console.log("Error in projectController (getProject)", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

export const getAllProjects = async (req, res) => {
    const { id } = req.params;
    const { search } = req.query;

    try {
        if(id){
            const projects = await Project.find({ team: id }).populate("team");
            return res.status(200).json({
                success: true,
                projects
            })
        } else if(search){
            const projects = await Project.find({ 
                $or: [
                    { title: { $regex: search, $options: "i"}},
                    { description: { $regex: search, $options: "i"}}
                ]
            }).populate("team");
            return res.status(200).json({   
                success: true,
                projects
            })
        } else {
            const projects = await Project.find().populate("team");
            return res.status(200).json({
                success: true,
                projects
            })
        }
    } catch (error) {
        console.log("Error in projectController (getAllProjects)", error.message);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}