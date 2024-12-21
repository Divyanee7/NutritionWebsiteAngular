// user.ts
export interface User {
    userId?: number;
    name: string;
    phone: string;
    email: string;
    dietaryPreferences: string;
    loginName: string;
    password: string;
    role: number;
    loginStatus: number;
    age: number;
    gender: string;
    height: number;
    weight: number;
    targetWeight: number;
    activityLevel: string;
    primaryGoal: string;
    weeklyGoal: number;
    foodAllergies: string;
    created_at?: Date;
    enabled: boolean;
}