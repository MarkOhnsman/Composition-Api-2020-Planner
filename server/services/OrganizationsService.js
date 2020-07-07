import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"


class OrganizationService {
    async getAll() {
        return await dbContext.Organizations.find({}).populate("creator", "name picture")
    }

    async getById(id, userEmail) {
        let data = await dbContext.Organizations.findOne({ _id: id, creatorEmail: userEmail })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Organization")
        }
        return data
    }

    async create(rawData) {
        let org = await dbContext.Organizations.create(rawData)
        let member = {
            email: rawData.creatorEmail,
            role: "director",
            organization: org._id
        }
        await dbContext.OrgMembers.create(member)
        return org
    }

    async edit(id, userEmail, update) {
        let data = await dbContext.Organizations.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Organization");
        }
        return data;
    }

    async delete(id, userEmail) {
        let data = await dbContext.Organizations.findOneAndRemove({ _id: id, creatorEmail: userEmail });
        if (!data) {
            throw new BadRequest("Invalid ID or you do not own this Organization");
        }
        await dbContext.OrgMembers.deleteMany({ organization: id })
    }

}


export const organizationService = new OrganizationService()