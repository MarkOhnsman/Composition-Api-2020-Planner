import BaseController from "../utils/BaseController";
import auth0provider from "@bcwdev/auth0provider";
import { meetingsService } from '../services/MeetingsService'



//PUBLIC
export class MeetingsController extends BaseController {
    constructor() {
        super("api/meetings")
        this.router
            .get('', this.getAll)
            .get('/:id', this.getById)
            .use(auth0provider.getAuthorizedUserInfo)
            .post('', this.create)
            .put('/:id', this.edit)
            .delete('/:id', this.delete)
    }


    async getAll(req, res, next) {
        try {
            //only gets meetings by user who is logged in
            let data = await meetingsService.getAll(req.userInfo.email)
            return res.send(data)
        }
        catch (err) { next(err) }
    }

    async getById(req, res, next) {
        try {
            let data = await meetingsService.getById(req.params.id, req.userInfo.email)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async create(req, res, next) {
        try {
            req.body.creatorEmail = req.userInfo.email
            let data = await meetingsService.create(req.body)
            return res.status(201).send(data)
        } catch (error) { next(error) }
    }

    async edit(req, res, next) {
        try {
            let data = await meetingsService.edit(req.params.id, req.userInfo.email, req.body)
            return res.send(data)
        } catch (error) { next(error) }
    }

    async delete(req, res, next) {
        try {
            await meetingsService.delete(req.params.id, req.userInfo.email)
            return res.send("Successfully deleted")
        } catch (error) { next(error) }
    }
}


