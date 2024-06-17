import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const Topbar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);
    const { logout } = useAuth();
    return (
        <Box display="flex" justifyContent="end" p={2} mx={0.4}>
            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
                <Link to="/profile">
                    <IconButton>
                        <PersonOutlinedIcon />
                    </IconButton>
                </Link>
                <IconButton
                    onClick={() => {
                        logout();
                        window.location.reload();
                    }}
                >
                    <LogoutOutlinedIcon />
                </IconButton>
            </Box>
        </Box>
    );
};

export default Topbar;
