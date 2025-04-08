import {FC, PropsWithChildren} from "react";
import {Sidebar, SidebarItem, SidebarItemGroup, SidebarItems} from "flowbite-react";
import {useQuery} from "@tanstack/react-query";
import {getRecentRecipes} from "../../api/recipe.ts";
import {queryKeys} from "../../constants/query-keys.ts";
import plusIcon from "../../icons/plus-icon.svg";
import recipeIcon from "../../icons/recipe-icon.svg";
import logoutIcon from "../../icons/logout-icon.svg";
import {useAuthContext} from "../../lib/auth/auth-context.ts";
import {useNavigate} from "react-router";

export const NavbarLayout: FC<PropsWithChildren> = ({children}) => {

    const recipeLimit = 30;
    const auth = useAuthContext();
    const navigate = useNavigate();

    const recentRecipeQuery = useQuery({
        queryKey: [queryKeys.recipes, recipeLimit],
        queryFn: () => {
            return getRecentRecipes(recipeLimit);
        }
    });

    const shortenText = (text: string): string => {
        const length = text.length
        if (length <= 20)
            return text
        return text.substring(0, 20) + "...";
    };

    return (
        <div className="flex">
            <Sidebar>
                <div className="flex gap-2 items-end ml-3">
                    <img src={logoutIcon} className="w-8 h-8 cursor-pointer" alt="logout-icon" onClick={() => auth?.logout()} />
                    <div className="text-3xl mt-3 ml-3 font-bold text-main-border-dark">SpaghettiAI</div>
                </div>
                <div className="mt-8">
                    <div
                        className="flex text-white items-center gap-3 ml-3 mt-3 mr-3 py-1 hover:bg-gradient-to-l hover:from-[#FFFFFF99] hover:to-[#FFFFFF00] cursor-pointer rounded-r-[10px]">
                        <img src={plusIcon} className="w-8 h-8" alt="plus-icon"/>
                        <div>New Recipe</div>
                    </div>
                    <div
                        className="flex text-white items-end gap-3 ml-3 mt-3 mr-3 py-1 hover:bg-gradient-to-l hover:from-[#FFFFFF99] hover:to-[#FFFFFF00] cursor-pointer rounded-r-[10px]">
                        <img src={recipeIcon} className="w-8 h-8" alt="plus-icon"/>
                        <div>My Recipes</div>
                    </div>
                </div>
                <div className="mt-8">
                    <div className="ml-3 mt-3 text-gray-400 text-md">Recent</div>
                    {!recentRecipeQuery.isFetching && !recentRecipeQuery.isError && (
                        <div className="h-[32rem] overflow-y-auto">
                            <SidebarItemGroup>
                                {recentRecipeQuery.data?.data.map((recipe) => (
                                    <SidebarItems key={recipe.id} className={window.location.pathname.includes(recipe.id) ? "bg-gradient-to-l from-[#FFFFFF99] to-[#FFFFFF00]" : ""}>
                                        <SidebarItem onClick={() => navigate(`/recipe/${recipe.id}`)}>
                                            {shortenText(recipe.name)}
                                        </SidebarItem>
                                    </SidebarItems>
                                ))}
                            </SidebarItemGroup>
                        </div>
                    )}
                </div>
            </Sidebar>
            <div className="w-full bg-[#F0C0000F]">
                {children}
            </div>
        </div>
    )
}