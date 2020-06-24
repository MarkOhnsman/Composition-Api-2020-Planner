export class Organization {
    constructor({ id, title, description = "no description", creatorEmail }) {
        if (!title) {
            throw new Error("Title Required")
        }
        this.title = title
        this.id = id
        this.description = description
        this.creatorEmail = creatorEmail
        this.someArray = []
    }
}