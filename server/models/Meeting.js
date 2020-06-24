import mongoose from "mongoose"
let Schema = mongoose.Schema
let ObjectId = Schema.Types.ObjectId

const chatMessage = new Schema({
    body: { type: String, required: true },
    creatorEmail: { type: String, required: true }
})

const Meeting = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    chat: [chatMessage],
    date: { type: String },
    creatorEmail: { type: String, required: true }
}, { timestamps: true, toJSON: { virtuals: true } })

Meeting.virtual("creator",
    {
        localField: "creatorEmail",
        ref: "Profile",
        foreignField: "email",
        justOne: true
    })

export default Meeting