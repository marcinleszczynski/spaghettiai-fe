import {Client} from "./client.ts";

export interface IRecipe {
    id: string,
    name: string,
    content: string
    explanation: string,
    creationTimestamp: string
}

export interface ICreateRecipe {
    description: string;
}

export const getRecipes = () => {
    return Client.get<IRecipe[]>("/recipe");
}

export const getSingleRecipe = (id: string) => {
    return Client.get<IRecipe>(`/recipe/${id}`);
}

export const getRecentRecipes = (limit: number) => {
    return Client.get<IRecipe[]>(`/recipe/recent?limit=${limit}`);
}

export const createRecipe = (description: string) => {
    return Client.post<IRecipe, ICreateRecipe>("/recipe/generate", { description });
}