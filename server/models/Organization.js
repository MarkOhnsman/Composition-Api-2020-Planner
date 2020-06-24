import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const Organization = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Organization.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default Organization