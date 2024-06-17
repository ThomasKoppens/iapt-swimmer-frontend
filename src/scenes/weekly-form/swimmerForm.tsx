import {
    Box,
    Button,
    Step,
    StepLabel,
    Stepper,
    MobileStepper,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import { Form, Formik } from "formik";
import { useState } from "react";
import athleteModel from "./formModels/athleteForm/athleteModel";
import SelfRating from "../../components/SelfRating";
import athleteFormInitialValues from "./formModels/athleteForm/athleteFormInitialValues";
import athleteValidationSchema from "./formModels/athleteForm/athleteValidationSchema";
import { tokens } from "../../theme";
import InputField from "../../components/InputField";

const { formId, formField } = athleteModel;
const { wellness, motivation, sleepQuality, fatigue, soreness, rpe, comment } =
    formField;

function renderStepContent(step: number) {
    switch (step) {
        case 0:
            return (
                <SelfRating
                    name={wellness.name}
                    label={wellness.label}
                    maxRating={wellness.maxRating}
                />
            );
        case 1:
            return (
                <SelfRating
                    name={motivation.name}
                    label={motivation.label}
                    maxRating={motivation.maxRating}
                />
            );
        case 2:
            return (
                <SelfRating
                    name={sleepQuality.name}
                    label={sleepQuality.label}
                    maxRating={sleepQuality.maxRating}
                />
            );
        case 3:
            return (
                <SelfRating
                    name={fatigue.name}
                    label={fatigue.label}
                    maxRating={fatigue.maxRating}
                />
            );
        case 4:
            return (
                <SelfRating
                    name={soreness.name}
                    label={soreness.label}
                    maxRating={soreness.maxRating}
                />
            );
        case 5:
            return (
                <SelfRating
                    name={rpe.name}
                    label={rpe.label}
                    maxRating={rpe.maxRating}
                />
            );
        case 6:
            return (
                <InputField
                    name={comment.name}
                    label={comment.label}
                    type={"text"}
                />
            );
        default:
            return null;
    }
}

const AthleteForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const secondaryColor = colors.greenAccent[500];
    const isNonMobile = useMediaQuery("(min-width: 600px");
    const [activeStep, setActiveStep] = useState<number>(0);
    const initialValues = athleteFormInitialValues;
    const athleteFormSchema = athleteValidationSchema;

    const steps = [
        "Wellness",
        "Motivation",
        "Sleep Quality",
        "Fatigue",
        "Soreness",
        "RPE",
        "Additional Comment",
    ];

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleFormSubmit = (values: any, actions: any) => {
        if (activeStep === steps.length - 1) {
            console.log(values);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    };

    return (
        <Box mx="10%" mt="2em">
            <Stepper
                sx={{
                    display: { xs: "none", sm: "flex" },
                    "& .MuiStepLabel-root .Mui-completed": {
                        color: secondaryColor,
                    },
                    "& .MuiStepLabel-label.Mui-completed.MuiStepLabel-alternativeLabel":
                        {
                            color:
                                theme.palette.mode === "dark"
                                    ? "white"
                                    : "black",
                        },
                    "& .MuiStepLabel-root .Mui-active": {
                        color: secondaryColor,
                    },
                    "& .MuiStepLabel-label.Mui-active.MuiStepLabel-alternativeLabel":
                        {
                            color:
                                theme.palette.mode === "dark"
                                    ? "white"
                                    : "black",
                        },
                    "& .MuiStepLabel-root .Mui-active .MuiStepIcon-text": {
                        fill: "black",
                    },
                }}
                alternativeLabel
                activeStep={activeStep}
            >
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
            <Box sx={{ display: { xs: "flex", sm: "none" } }}>
                <MobileStepper
                    variant="dots"
                    steps={steps.length}
                    position="static"
                    activeStep={activeStep}
                    sx={{
                        "& .MuiMobileStepper-dotActive": {
                            backgroundColor: secondaryColor,
                        },
                    }}
                    nextButton={
                        <Button
                            size="small"
                            onClick={handleNext}
                            variant="outlined"
                            color="secondary"
                            disabled={activeStep === steps.length - 1}
                            sx={{ mx: "0.5em" }}
                        >
                            Next
                        </Button>
                    }
                    backButton={
                        <Button
                            size="small"
                            variant="outlined"
                            color="secondary"
                            onClick={handleBack}
                            disabled={activeStep === 0}
                            sx={{ mx: "0.5em" }}
                        >
                            Back
                        </Button>
                    }
                />
            </Box>
            <Box mx="10%" mt="8em">
                {activeStep === steps.length ? (
                    <AthleteForm />
                ) : (
                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={athleteFormSchema}
                    >
                        {({ isSubmitting }) => (
                            <Form id={formId}>
                                {renderStepContent(activeStep)}

                                <Box display="flex" justifyContent="end">
                                    <Box
                                        sx={{
                                            display: "flex",
                                            flexDirection: "row",
                                            pt: 1.5,
                                        }}
                                    >
                                        {isNonMobile && (
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                disabled={activeStep === 0}
                                                onClick={handleBack}
                                                sx={{ mr: 1 }}
                                            >
                                                Back
                                            </Button>
                                        )}
                                        {(isNonMobile ||
                                            activeStep ===
                                                steps.length - 1) && (
                                            <Button
                                                disabled={isSubmitting}
                                                color="secondary"
                                                variant="contained"
                                                type="submit"
                                            >
                                                {activeStep === steps.length - 1
                                                    ? "Finish"
                                                    : "Next"}
                                            </Button>
                                        )}
                                    </Box>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                )}
            </Box>
        </Box>
    );
};

export default AthleteForm;
