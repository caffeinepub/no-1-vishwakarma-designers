import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export type Time = bigint;
export interface Feedback {
    id: bigint;
    name: string;
    comment: string;
    approved: boolean;
    timestamp: Time;
    rating: bigint;
}
export interface Order {
    id: bigint;
    status: OrderStatus;
    owner: Principal;
    name: string;
    email: string;
    address: string;
    notes: string;
    timestamp: Time;
    category: OrderCategory;
    phone: string;
    budget: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum OrderCategory {
    bedroom = "bedroom",
    bathroom = "bathroom",
    office = "office",
    painting = "painting",
    kitchen = "kitchen",
    falseCeiling = "falseCeiling",
    lighting = "lighting",
    livingRoom = "livingRoom",
    civilWork = "civilWork",
    wallDesign = "wallDesign",
    electricalWork = "electricalWork",
    flooring = "flooring",
    modularWardrobe = "modularWardrobe",
    modularWork = "modularWork"
}
export enum OrderStatus {
    pending = "pending",
    completed = "completed",
    inProgress = "inProgress"
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    claimAdmin(): Promise<boolean>;
    deleteOrder(orderId: bigint): Promise<boolean>;
    getAllFeedbacks(): Promise<Array<Feedback>>;
    getAllOrders(): Promise<Array<Order>>;
    getApprovedFeedbacks(): Promise<Array<Feedback>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getOrdersByCategory(category: OrderCategory): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasAnyAdmin(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    resetAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitFeedback(name: string, rating: bigint, comment: string): Promise<bigint>;
    submitOrder(name: string, phone: string, email: string, address: string, category: OrderCategory, budget: string, notes: string): Promise<bigint>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
