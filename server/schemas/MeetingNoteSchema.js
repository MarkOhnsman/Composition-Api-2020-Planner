import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const MeetingNoteSchema = new Schema({
    meeting: { type: ObjectId, ref: "Meeting", unique: true },
    body: { type: String, required: true },
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

MeetingNoteSchema.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default MeetingNoteSchema