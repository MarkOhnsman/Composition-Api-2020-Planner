import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class OrgMembersService {
    async getAll(userEmail) {
        return await dbContext.OrgMembers.find({ email: userEmail })
    }

    async getById(id, userEmail) {
        let data = await dbContext.OrgMembers.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this OrgMember")
        }
        return data
    }

    async create(rawData) {
        let data = await dbContext.OrgMembers.create(rawData)
        return data
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.OrgMembers.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this OrgMember");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.OrgMembers.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this OrgMember");
        }
    }

}


export const orgMembersService = new OrgMembersService()