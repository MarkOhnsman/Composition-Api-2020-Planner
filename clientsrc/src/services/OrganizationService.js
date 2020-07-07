import { api } from "./AxiosService"
import { AppState } from "../AppState"
import { Organization } from "../models/Organization"
class OrganizationService {
    async getAll() {
        try {
            let res = await api.get("/organizations")
            AppState.organizations = res.data.map(o => new Organization(o))
        }
        catch (e) {
            console.error(e)
        }
    }
    async getById(id) {
        try {
            let res = await api.get("/organizations/" + id)
            AppState.organizations = res.data
        }
        catch (e) {
            console.error(e)
        }
    }

    async getMyOrganizations() {
        try {
            let res = await api.get("/orgMembers/")
            AppState.myOrgIds = res.data
        }
        catch (e) {
            console.error(e)
        }
    }

    async create(org) {
        try {
            let res = await api.post("/organizations", org)
            AppState.organizations.push(new Organization(res.data))
            this.getMyOrganizations()
        }
        catch (e) {
            console.error(e)
        }
    }
    async edit(update) {
        try {
            let res = await api.put("/organizations/" + update.id, update)
            let index = AppState.organizations.findIndex(elem => elem.id == update.id)
            if (index == -1) {
                AppState.organizations.push(res.data)
                return
            }
            AppState.organizations.splice(index, 1, res.data)
        }
        catch (e) {
            console.error(e)
        }
    }
    async delete(id) {
        try {
            await api.delete("/organizations/" + id)
            AppState.organizations = AppState.organizations.filter(elem => elem.id != id)
        }
        catch (e) {
            console.error(e)
        }
    }
}

export const organizationService = new OrganizationService();