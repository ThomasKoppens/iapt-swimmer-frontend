import {
    Box,
    Button,
    TextField,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Formik } from "formik";
import coachModel from "./formModels/coachForm/coachModel";
import coachFormInitialValues from "./formModels/coachForm/coachFormInitialValues";
import coachValidationSchema from "./formModels/coachForm/coachValidationSchema";

const { formField } = coachModel;

const { totalVolume, trainingType, comment } = formField;

const CoachForm = () => {
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const initialValues = coachFormInitialValues;
    const coachFormSchema = coachValidationSchema;
    const theme = useTheme();

    const handleFormSubmit = (values: any) => {
        console.log(values);
    };
    return (
        <Box mx="25%" mt="2em">
            <Box textAlign="center" mb={2}>
                <Typography
                    variant="h2"
                    sx={{
                        whiteSpace: "nowrap",
                        color:
                            theme.palette.mode === "dark" ? "white" : "black",
                    }}
                >
                    Training Info
                </Typography>
            </Box>
            <Formik
                onSubmit={handleFormSubmit}
                initialValues={initialValues}
                validationSchema={coachFormSchema}
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
                                name={totalVolume.name}
                                label={totalVolume.label}
                                type="string"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.totalVolume}
                                error={
                                    !!touched.totalVolume &&
                                    !!errors.totalVolume
                                }
                                helperText={
                                    touched.totalVolume && errors.totalVolume
                                }
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                variant="filled"
                                name={trainingType.name}
                                label={trainingType.label}
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.trainingType}
                                error={
                                    !!touched.trainingType &&
                                    !!errors.trainingType
                                }
                                helperText={
                                    touched.trainingType && errors.trainingType
                                }
                                sx={{ gridColumn: "span 4" }}
                            />
                            <TextField
                                fullWidth
                                multiline
                                rows={6}
                                variant="filled"
                                name={comment.name}
                                label={comment.label}
                                type="text"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.comment}
                                error={!!touched.comment && !!errors.comment}
                                helperText={touched.comment && errors.comment}
                                sx={{ gridColumn: "span 4" }}
                            />
                        </Box>
                        <Box display="flex" justifyContent="end" mt="2em">
                            <Button
                                type="submit"
                                color="secondary"
                                variant="contained"
                            >
                                Submit
                            </Button>
                        </Box>
                    </form>
                )}
            </Formik>
        </Box>
    );
};

export default CoachForm;
