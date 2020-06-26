import { api } from "./AxiosService"
import { AppState } from "../AppState"

class ProfileService {
    async getProfile() {
        try {
            let res = await api.get("/profile")
            AppState.profile = res.data
            console.log(res.data)
        } catch (err) {
            console.error(err)
        }
    }
}

export const profileService = new ProfileService();
