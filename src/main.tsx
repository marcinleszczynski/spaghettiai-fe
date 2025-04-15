import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

import {NewRecipePage} from "./pages/new-recipe-page.tsx";
import {Flowbite} from "flowbite-react";
import {flowbiteTheme} from "./flowbite-theme.ts";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {AuthProvider} from "./components/auth/auth-provider.tsx";
import {AuthGuard} from "./components/auth/auth-guard.tsx";
import {locations} from "./constants/locations.ts";
import {LoginPage} from "./pages/login-page.tsx";
import {RegistrationPage} from "./pages/registration-page.tsx";
import {NavbarLayout} from "./components/layout/navbar-layout.tsx";
import {SingleRecipePage} from "./pages/single-recipe-page.tsx";
import {ActivationPage} from "./pages/activation-page.tsx";
import {RecipeListPage} from "./pages/recipe-list-page.tsx";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <Flowbite theme={{theme: flowbiteTheme}}>
                <BrowserRouter>
                    <AuthProvider>
                        <AuthGuard>
                            <Routes>
                                <Route
                                    path="/"
                                    element={
                                        <NavbarLayout>
                                            <NewRecipePage />
                                        </NavbarLayout>
                                    }
                                />
                                <Route
                                    path={locations.LOGIN}
                                    element={
                                        <LoginPage />
                                    }
                                />
                                <Route
                                    path={locations.REGISTER}
                                    element={
                                        <RegistrationPage />
                                    }
                                />
                                <Route
                                    path="/recipe/:id"
                                    element={
                                        <NavbarLayout>
                                            <SingleRecipePage />
                                        </NavbarLayout>
                                    }
                                />
                                <Route
                                    path="/auth/activate"
                                    element={
                                        <ActivationPage />
                                    }
                                />
                                <Route
                                    path="/recipe"
                                    element={
                                        <NavbarLayout>
                                            <RecipeListPage />
                                        </NavbarLayout>
                                    }
                                />
                            </Routes>
                        </AuthGuard>
                    </AuthProvider>
                </BrowserRouter>
            </Flowbite>
        </QueryClientProvider>
    </StrictMode>,
)
