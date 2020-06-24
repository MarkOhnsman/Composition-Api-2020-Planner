import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const OrgMember = new Schema({
    email: { type: String, required: true },
    organization: { type: ObjectId, ref: "Organization" },
    role: { type: String, required: true, enum: ["director", "member"], default: "member", lowercase: true }
}, { timestamps: true, toJSON: { virtuals: true } })

OrgMember.virtual("member",
    {
        localField: "email",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default OrgMember