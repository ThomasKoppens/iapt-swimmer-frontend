import {
    Box,
    Button,
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select,
    TextField,
} from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import bcrypt from "bcryptjs";

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    club: "",
    role: "",
};

const userSchema = yup.object().shape({
    firstName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "cannot enter numbers")
        .min(2)
        .max(20)
        .required("required"),
    lastName: yup
        .string()
        .matches(/^[A-Za-z]+$/, "cannot enter numbers")
        .min(2)
        .max(20)
        .required("required"),
    email: yup.string().email("invalid email").required("required"),
    club: yup.string().required("required"),
    role: yup.string().required("required"),
});

const CreateNewUser = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px");

    const handleFormSubmit = (values: typeof initialValues) => {
        const saltRounds = 10;
        const plaintextPassword: string = "potato";
        bcrypt.hash(
            plaintextPassword,
            saltRounds,
            function (err: Error | null, hash: string) {
                if (err) {
                    console.log(err);
                    return;
                }
                const newValues = { ...values, password: hash };
                alert(`Added ${JSON.stringify(newValues)}`);
            }
        );
    };
    return (
        <Box mx="25%" mt="2em">
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
                        <Box
                            display="grid"
                            gap="2em"
                            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                            sx={{
                                "& > div": {
                                    gridColumn: isNonMobile
                                        ? undefined
                                        : "span 4",
                                },
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="First Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.firstName}
                                name="firstName"
                                error={
                                    !!touched.firstName && !!errors.firstName
                                }
                                helperText={
                                    touched.firstName && errors.firstName
                                }
                                sx={{ gridColumn: "span 2" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Last Name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.lastName}
                                name="lastName"
                                error={!!touched.lastName && !!errors.lastName}
                                helperText={touched.lastName && errors.lastName}
                                sx={{ gridColumn: "span 2" }}
                            />
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
                                sx={{ gridColumn: "span 4" }}
                            />
                            <FormControl
                                fullWidth
                                sx={{
                                    gridColumn: "span 4",
                                    position: "relative",
                                }}
                            >
                                <InputLabel
                                    id="club-label"
                                    sx={{
                                        "&.Mui-focused": { top: "20%" },
                                    }}
                                >
                                    Club
                                </InputLabel>
                                <Select
                                    labelId="club-label"
                                    variant="filled"
                                    value={values.club}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="club"
                                    error={!!touched.club && !!errors.club}
                                >
                                    <MenuItem value="aquahub">Aquahub</MenuItem>
                                    <MenuItem value="other">Other</MenuItem>
                                </Select>
                                <FormHelperText
                                    error={!!touched.club && !!errors.club}
                                >
                                    {touched.club && errors.club}
                                </FormHelperText>
                            </FormControl>
                            <FormControl
                                fullWidth
                                sx={{
                                    gridColumn: "span 4",
                                    position: "relative",
                                }}
                            >
                                <InputLabel
                                    id="role-label"
                                    sx={{
                                        "&.Mui-focused": { top: "20%" },
                                    }}
                                >
                                    Role
                                </InputLabel>
                                <Select
                                    labelId="role-label"
                                    variant="filled"
                                    value={values.role}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    name="role"
                                    error={!!touched.role && !!errors.role}
                                >
                                    <MenuItem value="swimmer">Swimmer</MenuItem>
                                    <MenuItem value="coach">Coach</MenuItem>
                                </Select>
                                <FormHelperText
                                    error={!!touched.role && !!errors.role}
                                >
                                    {touched.role && errors.role}
                                </FormHelperText>
                            </FormControl>
                        </Box>
                        <Box display="flex" justifyContent="end" mt="2em">
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                            >
                                Create New User
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CreateNewUser;
