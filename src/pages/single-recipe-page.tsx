import {useParams} from "react-router";
import {useQuery} from "@tanstack/react-query";
import {getSingleRecipe, IRecipe} from "../api/recipe.ts";
import {queryKeys} from "../constants/query-keys.ts";
import {useEffect, useState} from "react";
import Markdown from "markdown-to-jsx";

export const SingleRecipePage = () => {

    const param = useParams();
    const recipeId = param.id ?? "";
    const [recipe, setRecipe] = useState<IRecipe | null>(null);

    const recipeQuery = useQuery({
        queryKey: [queryKeys.singleRecipe, recipeId],
        queryFn: () => getSingleRecipe(recipeId)
    });

    useEffect(() => {
        if (recipeQuery.data?.data) {
            setRecipe(recipeQuery.data.data);
            console.log(recipeQuery.data.data);
        }
    }, [recipeQuery.data])

    return (
        <>
            <div className="w-full h-full flex justify-center items-center">
                <div className="bg-white h-[90%] w-[70%] rounded-2xl ring-2 ring-main-border-dark">
                    {recipe && (
                        <div className="flex flex-col justify-between h-full">
                            <div className="text-black text-2xl text-center mt-4">{recipe?.name}</div>
                            <div className="text-black text-md mt-8 flex justify-center w-full h-[80%]">
                                <div className="w-[100%] h-full overflow-y-auto flex flex-col items-center">
                                    <div className="w-[70%]">
                                        <Markdown options={{
                                            forceBlock: true,
                                            overrides: {
                                                p: {
                                                    props: {
                                                        className: 'mb-4 whitespace-pre-line'
                                                    }
                                                },
                                                ol: {
                                                    props: {
                                                        className: 'list-decimal pl-6 mb-4 space-y-2'
                                                    }
                                                },
                                                li: {
                                                    props: {
                                                        className: 'mb-2'
                                                    }
                                                },
                                                strong: {
                                                    props: {
                                                        className: 'font-bold'
                                                    }
                                                }
                                            }
                                        }}>
                                            {recipe?.content}
                                        </Markdown>
                                    </div>
                                </div>
                            </div>
                            <div>
                                settings coming soon...
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}