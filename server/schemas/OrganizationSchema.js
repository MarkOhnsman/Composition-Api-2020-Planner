import mongoose from "mongoose"
import { Organization } from "../../clientsrc/src/models/Organization"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const OrganizationSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

OrganizationSchema.loadClass(Organization)

OrganizationSchema.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default OrganizationSchema