import mongoose from "mongoose";
import MeetingSchema from "../schemas/MeetingSchema";
import ProfileSchema from "../schemas/ProfileSchema";
import MeetingNoteSchema from "../schemas/MeetingNoteSchema";
import OrganizationSchema from "../schemas/OrganizationSchema";
import OrgMemberSchema from "../schemas/OrgMemberSchema";
import { Organization } from "../../clientsrc/src/models/Organization";

/**
 * @template T
 */
class dbSet {
  constructor(name, schema) {
    this.collection = mongoose.model(name, schema)
  }
  /**
   * @returns {Promise<T[]>}
   */
  find(query = {}) {
    (() => {
      return this.collection.find
    })()
  }
}



class DbContext {
  Meetings = mongoose.model("Meeting", MeetingSchema);
  MeetingNotes = mongoose.model("MeetingNote", MeetingNoteSchema)
  /**
   * @type {dbSet<Organization>}
   */
  Organizations = new dbSet("Organization", OrganizationSchema)
  //mongoose.model("Organization", OrganizationSchema)
  OrgMembers = mongoose.model("OrgMember", OrgMemberSchema)
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();

async function x() {
  let a = await dbContext.Organizations.find({})
  a[0].title
}