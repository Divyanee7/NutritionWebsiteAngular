export interface Meal {
    id: number;
    name: string;
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    ingredients: string[];
    instructions: string;
    image: string;
    mealType: 'BREAKFAST' | 'LUNCH' | 'DINNER' | 'SNACK';
    dietaryType: string;
  }
  
  export interface MealPlan {
    id: number;
    userId: number;
    date: string;
    meals: MealPlanItem[];
    totalCalories: number;
    totalProtein: number;
    totalCarbs: number;
    totalFats: number;
  }
  
  export interface MealPlanItem {
    id: number;
    mealId: number;
    meal: Meal;
    mealType: string;
    servingSize: number;
  }