import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const euro2024 = sqliteTable("euro2024", {
    id: integer("id").primaryKey(),
    title: text("title"),
    round: text("round"),
    date: text("date"),
    time: text("time"),
    home: text("home"),
    homeScore: text("homeScore"),
    competitor: text("competitor"),
    compScore: text("compScore"),
    updateDate: text('updateDate').notNull().default(sql`CURRENT_TIMESTAMP`),
});