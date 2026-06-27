/* ============================================================
   YAHAVI FORGE — Database Schema (Drizzle ORM + MySQL)
   Reference only — not wired in frontend.
   Used by the backend API (CF Workers / Node).
   ============================================================ */

// This file is a schema reference for the backend.
// Frontend does not import from this file.

export const SCHEMA_VERSION = '1.0.0'

/*
Tables:
  users          - userId, email, name, avatar, role, subscriptionTier, subscriptionExpiresAt
  subscriptions  - subscriptionId, userId, tier, amountInr, status, startedAt, expiresAt
  reviews        - reviewId, userId, toolId, rating, comment, verifiedPurchase, createdAt
  toolUsage      - usageId, userId, toolId, provider, tokensUsed, success, createdAt
  savedOutputs   - outputId, userId, title, sourceTool, content, createdAt
  toolDrafts     - draftId, userId, toolId, draftData, updatedAt
  coupons        - couponId, code, type, percentOff, usedByUserId, usedAt, expiresAt
*/
