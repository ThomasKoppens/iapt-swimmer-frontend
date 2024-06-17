import { Box, Button, TextField, Typography, useTheme } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import users from "../../../data/users.json";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import bcrypt from "bcryptjs";

const initialValues = {
    email: "",
    password: "",
};

const userSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
});

const LoginForm = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const theme = useTheme();

    useEffect(() => {
        if (isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    function authenticateUser(email: string, password: string) {
        return new Promise((resolve) => {
            const user = users.find(
                (u: { email: string }) => u.email === email
            );
            const saltRounds = 10;

            if (!user) {
                resolve({ state: "userNotFound" });
                return;
            }

            bcrypt.hash(
                password,
                saltRounds,
                (err: Error | null, hash: string) => {
                    if (err) {
                        console.error(err);
                        resolve({ state: "other" });
                    } else {
                        bcrypt.compare(
                            password,
                            hash,
                            (err: Error | null, result: boolean) => {
                                if (err) {
                                    console.error(err);
                                    resolve({ state: "other" });
                                } else if (result) {
                                    resolve({
                                        state: "success",
                                        role: user.role,
                                        id: user.id,
                                        firstName: user.firstName,
                                    });
                                } else {
                                    resolve({ state: "wrongPassword" });
                                }
                            }
                        );
                    }
                }
            );
        });
    }

    const handleFormSubmit = async (
        { email, password }: typeof initialValues,
        { setErrors }: any
    ) => {
        const { state, role, id, firstName }: any = await authenticateUser(
            email,
            password
        );

        switch (state) {
            case "userNotFound":
                setErrors({ email: "User not found" });
                break;
            case "wrongPassword":
                setErrors({ password: "Wrong password" });
                break;
            case "other":
                setErrors({ password: "Unexpected error, please try again." });
                break;
            case "success":
                if (role) {
                    login(role, id, firstName);
                    navigate("/");
                    window.location.reload();
                }
                break;
            default:
                console.log("undefined state");
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            p="2em"
        >
            <Box
                width="100%"
                mx={isNonMobile ? "25%" : "1em"}
                borderRadius="8px"
            >
                <Box textAlign="center" mb={2}>
                    <Typography
                        variant="h2"
                        sx={{
                            whiteSpace: "nowrap",
                            color:
                                theme.palette.mode === "dark"
                                    ? "white"
                                    : "black",
                        }}
                    >
                        Login
                    </Typography>
                </Box>
                <Formik
                    onSubmit={handleFormSubmit}
                    initialValues={initialValues}
                    validationSchema={userSchema}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleBlur,
                        handleChange,
                        handleSubmit,
                    }: any) => (
                        <form onSubmit={handleSubmit}>
                            <Box display="grid" gap="1.5em">
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="password"
                                    label="Password"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    name="password"
                                    error={
                                        !!touched.password && !!errors.password
                                    }
                                    helperText={
                                        touched.password && errors.password
                                    }
                                />
                            </Box>
                            <Box
                                display="flex"
                                justifyContent="flex-end"
                                mt={2}
                            >
                                <Button
                                    fullWidth={!isNonMobile}
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                >
                                    Login
                                </Button>
                            </Box>
                        </form>
                    )}
                </Formik>
            </Box>
        </Box>
    );
};

export default LoginForm;
