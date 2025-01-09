export interface Recipe {
  recipeId?: number;
  recipeName: string;
  description: string;
  ingredients: string;
  instructions: string;
  cookingTime: number;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  category: string;
   imageUrl?: string;
   imageFile?: File; 
  // imageData?: any;
  createdAt?: Date;
}