import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class MeetingNotesService {
    async getAll(userEmail) {
        return await dbContext.MeetingNotes.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.MeetingNotes.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this MeetingNote")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.MeetingNotes.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.MeetingNotes.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this MeetingNote");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.MeetingNotes.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this MeetingNote");
        }
    }

}


export const meetingNotesService = new MeetingNotesService()