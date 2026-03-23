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
    kitchen = "kitchen",
    livingRoom = "livingRoom"
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
    getAllOrders(): Promise<Array<Order>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMyOrders(): Promise<Array<Order>>;
    getOrder(orderId: bigint): Promise<Order | null>;
    getOrdersByCategory(category: OrderCategory): Promise<Array<Order>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    submitOrder(name: string, phone: string, email: string, address: string, category: OrderCategory, budget: string, notes: string): Promise<bigint>;
    updateOrderStatus(orderId: bigint, status: OrderStatus): Promise<void>;
}
