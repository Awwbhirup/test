import { pgTable, text, boolean, uuid, timestamp } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  registrationNumber: text("registration_number").unique().notNull(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  gender: text("gender"),
  isDayScholar: boolean("is_day_scholar").default(true),
  hostelBlock: text("hostel_block"),
  roomNumber: text("room_number"),
  githubLink: text("github_link"),
  instagramHandle: text("instagram_handle"),
  teamId: uuid("team_id"), // Foreign key added manually for simplicity
  createdAt: timestamp("created_at").defaultNow(),
});

export const teams = pgTable("teams", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  teamCode: text("team_code").unique().notNull(),
  leaderId: uuid("leader_id").references(() => users.id),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ one }) => ({
  team: one(teams, {
    fields: [users.teamId],
    references: [teams.id],
  }),
}));

export const teamsRelations = relations(teams, ({ many, one }) => ({
  members: many(users),
  leader: one(users, {
    fields: [teams.leaderId],
    references: [users.id],
  }),
}));
