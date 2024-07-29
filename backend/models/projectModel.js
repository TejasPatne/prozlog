import mongoose from "mongoose";

const projectSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: 10,
        maxLength: 150
    },
    domain: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    video: {
        type: String,
    },
    github: {
        type: String
    },
    mentors: {
        type: [
            {
                name: {
                    type: String,
                    required: true
                }
            }
        ],
        maxLength: 2,
        required: true
    },
    team: {
        type: [
            {
                type: mongoose.Schema.ObjectId,
                ref: "User"
            }
        ],
        maxLength: 4,
        required: true
    }
}, {
    timestamp: true,
    toJSON: {
        versionKey: false,
        transform(doc, ret) {
            delete ret.__v,
            delete ret.updatedAt
        }
    }
});

const Project = mongoose.model("Project", projectSchema);
export default Project;