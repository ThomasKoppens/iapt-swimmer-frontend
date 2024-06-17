import { Box, TextField } from "@mui/material";
import { useState } from "react";
import { Typography, Button } from "@mui/material";
import users from "../../../data/users.json";
import useAuth from "../../hooks/useAuth";
import bcrypt from "bcryptjs";

const Profile = () => {
    const { isAuthenticated, firstName } = useAuth();
    const [password, setPassword] = useState("");
    let username = "";

    if (isAuthenticated) {
        const user = users.find(
            (u: { firstName: string }) => u.firstName === firstName
        );
        if (!user) return;

        username = user.firstName;
    }

    const handleSaveClick = () => {
        const saltRounds = 10;
        const plaintextPassword = password;
        bcrypt.hash(
            plaintextPassword,
            saltRounds,
            function (err: Error | null, hash: string) {
                if (err) {
                    console.log(err);
                    return;
                }
                alert(`New password: ${hash}`);
            }
        );
    };

    return (
        <Box display="flex" flexDirection="column" alignItems="center">
            <Box sx={{ display: "flex", justifyContent: "center" }}>
                <Typography variant="h3">
                    Hello, <span style={{ color: "#6870fa" }}>{username}</span>
                </Typography>
            </Box>
            <Box py="4em">
                <TextField
                    placeholder="Change Password"
                    aria-label="Change Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="secondary"
                    sx={{ height: "100%", marginLeft: "0.25em" }}
                    onClick={handleSaveClick}
                >
                    Save
                </Button>
            </Box>
        </Box>
    );
};

export default Profile;
