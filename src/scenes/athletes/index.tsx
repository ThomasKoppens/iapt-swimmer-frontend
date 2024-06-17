import {
    Box,
    Button,
    InputAdornment,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    useTheme,
} from "@mui/material";
import users from "../../../data/users.json";
import { tokens } from "../../theme";
import { useNavigate } from "react-router-dom";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Athletes = () => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const [rows, setRows] = useState<(typeof users)[0][]>(users);
    const [searched, setSearched] = useState<string>("");

    const requestSearch = (searchedVal: string) => {
        setSearched(searchedVal); // Update the searched state
        const filteredRows = users.filter((user) => {
            const blob = `${user.firstName}${user.lastName}${user.club}${user.id}`;
            return blob.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows); // Update the rows state with filtered results
    };

    const cancelSearch = () => {
        setSearched(""); // Clear the searched state
        setRows(users); // Reset rows to the original data
    };

    function handleVisit(firstName: string): void {
        navigate(`/athletes/${firstName}`);
    }

    function handleDelete(firstName: string): void {
        alert(
            `Deleted ${JSON.stringify(
                users.filter((user) => user.firstName === firstName)
            )}`
        );
    }

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            mx="3em"
            p={0.5}
        >
            <TextField
                placeholder="Search athletes..."
                fullWidth
                value={searched}
                variant="outlined"
                onChange={(event) => requestSearch(event.target.value)}
                onBlur={() => cancelSearch()}
                sx={{ marginBottom: "1em" }}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchOutlinedIcon />
                        </InputAdornment>
                    ),
                    sx: {
                        "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                            borderColor: colours.grey[600],
                            borderWidth: "1px",
                        },
                    },
                }}
            />
            <TableContainer
                component={Paper}
                sx={{
                    marginX: "1em",
                    padding: "1em",
                    paddingBottom: "0",
                    backgroundColor:
                        theme.palette.mode === "dark"
                            ? colours.primary[700]
                            : colours.primary[900],
                }}
            >
                <Table sx={{ minWidth: 650 }} aria-label="Athlete Table">
                    <TableHead>
                        <TableRow>
                            <TableCell>
                                <b>ID</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>First Name</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Last Name</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Club</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>View</b>
                            </TableCell>
                            <TableCell align="center">
                                <b>Delete</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .filter((user) => user.role === "swimmer")
                            .map((user) => (
                                <TableRow
                                    key={user.id}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
                                    <TableCell component="th" scope="row">
                                        {user.id}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.firstName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.lastName}
                                    </TableCell>
                                    <TableCell align="center">
                                        {user.club}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            variant={
                                                theme.palette.mode === "dark"
                                                    ? "outlined"
                                                    : "contained"
                                            }
                                            color="secondary"
                                            onClick={() =>
                                                handleVisit(user.firstName)
                                            }
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Button
                                            style={{
                                                maxWidth: "3em",
                                                minWidth: "3em",
                                            }}
                                            variant="contained"
                                            color="error"
                                            onClick={() =>
                                                handleDelete(user.firstName)
                                            }
                                        >
                                            <DeleteOutlineOutlinedIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default Athletes;
