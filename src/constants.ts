export const ROLES = {
    SELLER: "seller",
    BUYER: "buyer",
} as const;

export type UserRole = typeof ROLES[keyof typeof ROLES];
