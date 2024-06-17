import { Box, Slider, Typography, useTheme } from "@mui/material";
import { useField } from "formik";
import { tokens } from "../theme";

interface SelfRatingProps {
    name: string;
    label: string;
    maxRating: number;
}

const SelfRating = ({ name, label, maxRating }: SelfRatingProps) => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [field, _, helper] = useField({ name });
    const { setValue } = helper;
    const { value } = field;
    return (
        <Box
            sx={{
                gridColumn: "span 4",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "1.5em",
                borderRadius: "0.5em",
            }}
        >
            <Typography variant="h3" component="legend" mb="1em">
                {label}
            </Typography>
            <Slider
                name={name}
                defaultValue={0}
                step={1}
                marks={Array.from({ length: maxRating + 1 }, (_, i) => ({
                    value: i,
                    label: i,
                }))}
                min={0}
                max={maxRating}
                value={value ? value : 0}
                onChange={(_, value) => setValue(value)}
                sx={{
                    color:
                        theme.palette.mode === "dark"
                            ? "white"
                            : colours.grey[500],
                }}
            />
        </Box>
    );
};

export default SelfRating;
