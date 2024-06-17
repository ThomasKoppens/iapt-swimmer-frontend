import { Box, TextField, Typography } from "@mui/material";
import { useField } from "formik";

interface InputFieldProps {
    name: string;
    label: string;
    type: "number" | "password" | "text" | "email" | "month" | "color"; // Can grow depending on need
}

const InputField = ({ name, label, type }: InputFieldProps) => {
    const [field, _] = useField({ name });
    return (
        <Box
            sx={{
                gridColumn: "span 4",
                display: "flex",
                flexDirection: "column",
                alignItems: "start",
                padding: "1.5em",
                borderRadius: "0.5em",
            }}
        >
            <Typography variant="h5" component="legend" mb="1em">
                {label}
            </Typography>
            <TextField type={type} {...field} fullWidth variant="outlined" />
        </Box>
    );
};

export default InputField;
