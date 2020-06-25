import mongoose from "mongoose";
import Meeting from "../models/Meeting";
import ProfileSchema from "../schemas/ProfileSchema";
import MeetingNoteSchema from "../schemas/MeetingNoteSchema";
import OrganizationSchema from "../schemas/OrganizationSchema";
import OrgMemberSchema from "../schemas/OrgMemberSchema";
import MeetingSchema from "../schemas/MeetingSchema";
class DbContext {
  Meetings = mongoose.model("Meeting", MeetingSchema);
  MeetingNotes = mongoose.model("MeetingNote", MeetingNoteSchema)
  Organizations = mongoose.model("Organization", OrganizationSchema)
  OrgMembers = mongoose.model("OrgMember", OrgMemberSchema)
  Profile = mongoose.model("Profile", ProfileSchema);
}

export const dbContext = new DbContext();
