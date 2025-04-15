import {FC} from "react";
import {useQuery} from "@tanstack/react-query";
import {queryKeys} from "../constants/query-keys.ts";
import {getRecipes} from "../api/recipe.ts";
import {useNavigate} from "react-router";

export const RecipeListPage: FC = () => {

    const navigate = useNavigate();

    const recipeQuery = useQuery({
        queryKey: [queryKeys.recipesList],
        queryFn: () => {
            return getRecipes();
        }
    });

    const extractDate = (date: string) => {
        return date.substring(0, 10)
    };

    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="bg-white h-[90%] w-[70%] rounded-2xl ring-2 ring-main-border-dark flex items-center">
                <div className="flex flex-col justify-start gap-3 items-center w-full h-[90%] p-3 overflow-y-auto">
                    {!recipeQuery.isFetching && recipeQuery.isSuccess && recipeQuery.data?.data.map((recipe) => (
                        <div
                            className="bg-[#00000010] hover:bg-[#00000030] cursor-pointer p-4 rounded-[10px] ring-2 ring-main-border-dark text-center min-w-[50%]"
                            onClick={() => navigate(`/recipe/${recipe.id}`)}
                        >
                            <div>{recipe.name}</div>
                            <div className="text-sm mt-2">{extractDate(recipe.creationTimestamp)}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}