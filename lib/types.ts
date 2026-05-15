export type SourceType = 'url' | 'manual' | 'book' | 'social'
export type MealType = 'breakfast' | 'lunch' | 'dinner'
export type AisleCategory =
  | 'produce'
  | 'meat'
  | 'fish'
  | 'dairy'
  | 'bakery'
  | 'frozen'
  | 'tinned'
  | 'dry_goods'
  | 'condiments'
  | 'drinks'
  | 'other'

export interface Recipe {
  id: string
  title: string
  source_type: SourceType
  source_url?: string
  source_name?: string
  serves: number
  prep_time_mins?: number
  cook_time_mins?: number
  method?: string
  image_url?: string
  created_at: string
  user_id: string
}

export interface Ingredient {
  id: string
  name: string
  default_unit?: string
  aisle_category: AisleCategory
}

export interface RecipeIngredient {
  id: string
  recipe_id: string
  ingredient_id: string
  quantity: number
  unit: string
  prep_note?: string
  optional: boolean
  ingredient?: Ingredient
}

export interface Tag {
  id: string
  name: string
  colour?: string
}

export interface MealPlan {
  id: string
  user_id: string
  week_start_date: string
  name?: string
}

export interface MealPlanSlot {
  id: string
  meal_plan_id: string
  recipe_id: string
  day_of_week: number
  meal_type: MealType
  servings: number
  recipe?: Recipe
}

export interface ShoppingList {
  id: string
  meal_plan_id: string
  generated_at: string
}

export interface ShoppingListItem {
  id: string
  list_id: string
  ingredient_id?: string
  ingredient_name: string
  quantity: number
  unit: string
  checked: boolean
  manual: boolean
  aisle_category: AisleCategory
}
