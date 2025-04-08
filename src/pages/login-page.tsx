import {FC} from "react";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {IUserLoginRequest, login} from "../api/auth.ts";
import {Button, Label, TextInput} from "flowbite-react";
import {useMutation} from "@tanstack/react-query";
import {useAuthContext} from "../lib/auth/auth-context.ts";
import {useNavigate} from "react-router";
import {LoadingButtonWrapper} from "../components/button/loading-button-wrapper.tsx";
import {LoginBackground} from "../components/login/login-background.tsx";
import {LoginFrame} from "../components/login/login-frame.tsx";

export const LoginPage: FC = () => {

    const loginForm = useForm<IUserLoginRequest>({
        mode: "onChange"
    });

    const {control, watch, formState: {errors, isValid}, handleSubmit} = loginForm;
    const auth = useAuthContext();
    const navigate = useNavigate();

    const loginMutation = useMutation({
        mutationFn: () => {
            return login(watch("email"), watch("password"))
        },
        onSuccess: (response) => {
            auth?.login(response.data.token);
            navigate("/");
        },
        onError: (error) => {
            console.log("Error appeared:\n" + error.message)
        }
    })

    const onLogin = () => {
        if (!isValid) {
            return
        }
        loginMutation.mutate();
    }

    return (
        <LoginBackground>
            <LoginFrame width={50} height={50}>
                <div className="flex flex-col gap-3 items-center">
                    <span className="text-white text-3xl font-bold">Welcome to Spaghetti AI</span>
                    <span className="text-gray-300">Please log in to start your adventure with creating awesome meals</span>
                </div>
                <FormProvider {...loginForm}>
                    <form className="flex flex-col gap-2 justify-center" onSubmit={handleSubmit(onLogin)}>
                        <div>
                            <Label htmlFor="email">Email</Label>
                            <Controller
                                control={control}
                                rules={{
                                    required: "This field is required"
                                }}
                                name="email"
                                render={({field}) => (
                                    <TextInput
                                        id="email"
                                        name="email"
                                        type="text"
                                        value={watch("email")}
                                        placeholder="Enter email..."
                                        onChange={(e) => field.onChange(e)}
                                        helperText={errors.email?.message}
                                        color={errors.email ? "failure" : "success"}
                                    />
                                )}
                            />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Controller
                                control={control}
                                rules={{
                                    required: "This field is required"
                                }}
                                name="password"
                                render={({field}) => (
                                    <TextInput
                                        id="password"
                                        name="password"
                                        type="password"
                                        value={watch("password")}
                                        placeholder="Enter password..."
                                        onChange={(e) => field.onChange(e)}
                                        helperText={errors.password?.message}
                                        color={errors.password ? "failure" : "success"}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <LoadingButtonWrapper isLoading={loginMutation.isPending}>
                                <Button color="main" type="submit">Login</Button>
                            </LoadingButtonWrapper>
                        </div>
                        <div className="text-white">
                            Don't have an account? <a href="/auth/register" className="hover:text-main-border-light">Click here to create one for FREE</a>
                        </div>
                    </form>
                </FormProvider>
            </LoginFrame>
        </LoginBackground>
    )
}