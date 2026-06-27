import { mysqlTable, mysqlEnum, serial, varchar, text, timestamp, boolean, int, json, bigint } from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: serial("id").primaryKey(),
  unionId: varchar("unionId", { length: 255 }).notNull().unique(),
  name: varchar("name", { length: 255 }),
  email: varchar("email", { length: 320 }),
  avatar: text("avatar"),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  subscriptionTier: mysqlEnum("subscriptionTier", ["free", "day_pass", "monthly", "yearly"]).default("free").notNull(),
  subscriptionExpiresAt: timestamp("subscriptionExpiresAt"),
  studentVerified: boolean("studentVerified").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().notNull().$onUpdate(() => new Date()),
  lastSignInAt: timestamp("lastSignInAt").defaultNow().notNull(),
});

export const userApiKeys = mysqlTable("user_api_keys", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  provider: varchar("provider", { length: 50 }).notNull(),
  keyEncrypted: text("key_encrypted").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const toolUsage = mysqlTable("tool_usage", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  toolId: varchar("toolId", { length: 100 }).notNull(),
  provider: varchar("provider", { length: 50 }),
  tokensUsed: int("tokens_used"),
  success: boolean("success").default(true),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const conversations = mysqlTable("conversations", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  title: varchar("title", { length: 255 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const chatMessages = mysqlTable("chat_messages", {
  id: serial("id").primaryKey(),
  conversationId: bigint("conversationId", { mode: "number", unsigned: true }).notNull(),
  role: varchar("role", { length: 20 }).notNull(),
  content: text("content").notNull(),
  provider: varchar("provider", { length: 50 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reviews = mysqlTable("reviews", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }),
  toolId: varchar("toolId", { length: 100 }),
  rating: int("rating").notNull(),
  comment: text("comment"),
  verifiedPurchase: boolean("verified_purchase").default(false),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const subscriptions = mysqlTable("subscriptions", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  tier: varchar("tier", { length: 50 }).notNull(),
  amountInr: int("amount_inr").notNull(),
  status: varchar("status", { length: 50 }).default("active").notNull(),
  startedAt: timestamp("started_at").defaultNow().notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const toolDrafts = mysqlTable("tool_drafts", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  toolId: varchar("toolId", { length: 100 }).notNull(),
  draftData: json("draft_data").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const savedOutputs = mysqlTable("saved_outputs", {
  id: serial("id").primaryKey(),
  userId: bigint("userId", { mode: "number", unsigned: true }).notNull(),
  title: varchar("title", { length: 255 }),
  sourceTool: varchar("sourceTool", { length: 100 }),
  content: text("content"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type UserApiKey = typeof userApiKeys.$inferSelect;
export type ToolUsage = typeof toolUsage.$inferSelect;
export type Conversation = typeof conversations.$inferSelect;
export type ChatMessage = typeof chatMessages.$inferSelect;
export type Review = typeof reviews.$inferSelect;
export type Subscription = typeof subscriptions.$inferSelect;
export type ToolDraft = typeof toolDrafts.$inferSelect;
export type SavedOutput = typeof savedOutputs.$inferSelect;
