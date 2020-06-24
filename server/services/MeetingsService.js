import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class MeetingsService {
    async getAll(userEmail) {
        return await dbContext.Meetings.find({ creatorEmail: userEmail }).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Meetings.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Meeting")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.Meetings.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Meetings.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Meeting");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Meetings.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Meeting");
        }
    }

}


export const meetingsService = new MeetingsService()