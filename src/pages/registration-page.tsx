import {FC, useState} from "react";
import {LoginBackground} from "../components/login/login-background.tsx";
import {LoginFrame} from "../components/login/login-frame.tsx";
import {Controller, FormProvider, useForm} from "react-hook-form";
import {Button, Label, TextInput} from "flowbite-react";
import {IUserRegistrationRequest, register} from "../api/auth.ts";
import {LoadingButtonWrapper} from "../components/button/loading-button-wrapper.tsx";
import {useMutation} from "@tanstack/react-query";
import {ErrorModal} from "../components/modals/error-modal.tsx";
import {LinkSentModal} from "../components/modals/link-sent-modal.tsx";

export const RegistrationPage: FC = () => {

    const [isShowingLinkSentModal, setIsShowingLinkSentModal] = useState<boolean>(false);
    const [isShowingErrorModal, setIsShowingErrorModal] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string>("");

    const registrationForm = useForm<IUserRegistrationRequest>({
        mode: "onChange"
    });

    const {control, watch, formState: {isValid, errors}, handleSubmit} = registrationForm;

    const registerMutation = useMutation(({
        mutationFn: () => {
            return register({
                email: watch("email"),
                password: watch("password"),
                firstName: watch("firstName"),
                lastName: watch("lastName"),
                phoneNumber: watch("phoneNumber")
            })
        },
        onSuccess: () => {
            setIsShowingLinkSentModal(true);
        },
        onError: (error) => {
            setErrorMessage(error.message)
            setIsShowingErrorModal(true)
        }
    }))

    const onRegister = () => {
        if (!isValid) {
            return;
        }
        registerMutation.mutate();
    }

    const onModalClose = () => {
        setIsShowingErrorModal(false);
        setIsShowingLinkSentModal(false);
    }

    return (
        <LoginBackground>
            <LoginFrame width={50} height={50}>
                <div className="flex flex-col gap-3">
                    <span className="text-white text-3xl font-bold">Enter your credentials to create free account</span>
                </div>
                <FormProvider {...registrationForm}>
                    <form className="flex flex-col gap-2 mt-3" onSubmit={handleSubmit(onRegister)}>
                        <div className="flex justify-between gap-2">
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "This field is required",
                                        }}
                                        name="firstName"
                                        render={({field}) => (
                                            <TextInput
                                                id="firstName"
                                                name="firstName"
                                                type="text"
                                                placeholder="Enter your First Name..."
                                                value={watch("firstName")}
                                                onChange={(e) => field.onChange(e)}
                                                color={errors.firstName ? "failure" : "success"}
                                                helperText={errors.firstName?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">
                                        Email Address
                                    </Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "This field is required",
                                        }}
                                        name="email"
                                        render={({field}) => (
                                            <TextInput
                                                id="email"
                                                name="email"
                                                type="text"
                                                placeholder="Enter your Email Address..."
                                                value={watch("email")}
                                                onChange={(e) => field.onChange(e)}
                                                color={errors.email ? "failure" : "success"}
                                                helperText={errors.email?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="flex flex-col gap-3">
                                <div>
                                    <Label htmlFor="lastName">
                                        Last Name
                                    </Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "This field is required",
                                        }}
                                        name="lastName"
                                        render={({field}) => (
                                            <TextInput
                                                id="lastName"
                                                name="lastName"
                                                type="text"
                                                placeholder="Enter your Last Name..."
                                                value={watch("lastName")}
                                                onChange={(e) => field.onChange(e)}
                                                color={errors.lastName ? "failure" : "success"}
                                                helperText={errors.lastName?.message}
                                            />
                                        )}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="password">
                                        Password
                                    </Label>
                                    <Controller
                                        control={control}
                                        rules={{
                                            required: "This field is required",
                                        }}
                                        name="password"
                                        render={({field}) => (
                                            <TextInput
                                                id="password"
                                                name="password"
                                                type="password"
                                                placeholder="Enter your Password..."
                                                value={watch("password")}
                                                onChange={(e) => field.onChange(e)}
                                                color={errors.password ? "failure" : "success"}
                                                helperText={errors.password?.message}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <Label htmlFor="phoneNumber">
                                Phone Number
                            </Label>
                            <Controller
                                control={control}
                                rules={{
                                    required: "This field is required",
                                }}
                                name="phoneNumber"
                                render={({field}) => (
                                    <TextInput
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        type="text"
                                        placeholder="Enter your Phone Number..."
                                        value={watch("phoneNumber")}
                                        onChange={(e) => field.onChange(e)}
                                        color={errors.phoneNumber ? "failure" : "success"}
                                        helperText={errors.phoneNumber?.message}
                                    />
                                )}
                            />
                        </div>
                        <div className="flex justify-center mt-3">
                            <LoadingButtonWrapper isLoading={registerMutation.isPending}>
                                <Button color="main" type="submit">Create Account</Button>
                            </LoadingButtonWrapper>
                        </div>
                        <div className="text-white flex justify-center">
                            Already have an account? <a href="/auth/login" className="hover:text-main-border-light ml-2">Click here to log in</a>
                        </div>
                    </form>
                </FormProvider>
                {isShowingErrorModal && (
                    <ErrorModal show={isShowingErrorModal} closeFn={onModalClose} errorMessage={errorMessage}/>
                )}
                {isShowingLinkSentModal && (
                    <LinkSentModal show={isShowingLinkSentModal} closeFn={onModalClose} />
                )}
            </LoginFrame>
        </LoginBackground>
    )
}