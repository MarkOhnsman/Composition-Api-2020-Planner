import { api } from "./AxiosService"
import { AppState } from "../AppState"

export const ProfileService = {
    async getProfile() {
        try {
            let res = await api.get("/profile")
            AppState.profile = res.data
        } catch (err) {
            console.error(err)
        }
    }
}
