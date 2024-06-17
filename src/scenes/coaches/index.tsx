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
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

const Coaches = () => {
    const theme = useTheme();
    const colours = tokens(theme.palette.mode);
    const [rows, setRows] = useState<(typeof users)[0][]>(users);
    const [searched, setSearched] = useState<string>("");

    const requestSearch = (searchedVal: string) => {
        setSearched(searchedVal); // Update the searched state
        const filteredRows = users.filter((user) => {
            const blob = `${user.firstName}${user.lastName}${user.club}`;
            return blob.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRows(filteredRows); // Update the rows state with filtered results
    };

    const cancelSearch = () => {
        setSearched(""); // Clear the searched state
        setRows(users); // Reset rows to the original data
    };

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
                placeholder="Search coaches..."
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
                                <b>Delete</b>
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .filter((user) => user.role === "coach")
                            .map((user) => (
                                <TableRow
                                    key={user.firstName}
                                    sx={{
                                        "&:last-child td, &:last-child th": {
                                            border: 0,
                                        },
                                    }}
                                >
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

export default Coaches;
