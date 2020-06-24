import mongoose from "mongoose";
import Meeting from "../models/Meeting";
import Profile from "../models/Profile";
import MeetingNote from "../models/MeetingNote";
import Organization from "../models/Organization";
import OrgMember from "../models/OrgMember";
class DbContext {
  Meetings = mongoose.model("Meeting", Meeting);
  MeetingNotes = mongoose.model("MeetingNote", MeetingNote)
  Organizations = mongoose.model("Organization", Organization)
  OrgMembers = mongoose.model("OrgMember", OrgMember)
  Profile = mongoose.model("Profile", Profile);
}

export const dbContext = new DbContext();
