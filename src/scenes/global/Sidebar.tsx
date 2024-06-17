import { useTheme } from "@mui/material/styles";
import { Box, Divider, IconButton, Typography, colors } from "@mui/material";
import { Link } from "react-router-dom";
import { ReactNode, useState } from "react";
import { tokens } from "../../theme";
import { Menu, MenuItem, ProSidebar } from "react-pro-sidebar";
import "react-pro-sidebar/dist/css/styles.css";
import AnalyticsOutlinedIcon from "@mui/icons-material/AnalyticsOutlined";
import AssignmentIndOutlinedIcon from "@mui/icons-material/AssignmentIndOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import PoolOutlinedIcon from "@mui/icons-material/PoolOutlined";
import SportsOutlinedIcon from "@mui/icons-material/SportsOutlined";
import useAuth from "../../hooks/useAuth";

interface ItemProps {
    icon: ReactNode;
    title: string;
    to: string;
    selected: string;
    setSelected: any;
}

const Item = ({ icon, title, to, selected, setSelected }: ItemProps) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <MenuItem
            active={selected === title}
            style={{ color: colors.grey[100] }}
            onClick={() => setSelected(title)}
            icon={icon}
        >
            <Typography>{title}</Typography>
            <Link to={to}></Link>
        </MenuItem>
    );
};

export default function Sidebar() {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setSelected] = useState("Dashboard");
    const [open, setOpen] = useState(false);
    const { isAuthenticated, role } = useAuth();

    const handleDrawerToggle = () => {
        setOpen(!open);
    };

    return (
        <Box
            sx={{
                "& .pro-sidebar-inner": {
                    background: `${
                        theme.palette.mode === "dark"
                            ? colors.primary[600]
                            : colors.grey[800]
                    } !important`,
                },
                "& .pro-icon-wrapper": {
                    backgroundColor: "transparent !important",
                },
                "& .pro-inner-item": {
                    padding: "5px 35px 5px 20px !important",
                },
                "& .pro-inner-item:hover": {
                    color: "#868dfb !important",
                },
                "& .pro-menu-item.active": {
                    color: "#6870fa !important",
                },
            }}
        >
            <ProSidebar collapsed={open}>
                <Menu iconShape="square">
                    <Box
                        sx={{
                            display: "flex",
                            flexDirection: "row",
                            alignItems: "center",
                            mx: "1.4em",
                            py: "1em",
                            overflow: "hidden",
                        }}
                    >
                        <IconButton
                            onClick={handleDrawerToggle}
                            sx={{
                                mr: "0.5em",
                            }}
                        >
                            <MenuOutlinedIcon />
                        </IconButton>
                        <Typography
                            variant="h4"
                            sx={{
                                whiteSpace: "nowrap",
                                color:
                                    theme.palette.mode === "dark"
                                        ? "white"
                                        : "black",
                            }}
                        >
                            {selected}
                        </Typography>
                    </Box>
                    <Divider />
                    <Item
                        icon={<AnalyticsOutlinedIcon />}
                        title="Dashboard"
                        to="/"
                        selected={selected}
                        setSelected={setSelected}
                    />
                    {isAuthenticated && role === "physio" && (
                        <>
                            <Item
                                icon={<PoolOutlinedIcon />}
                                title="Athletes"
                                to="/athletes"
                                selected={selected}
                                setSelected={setSelected}
                            />
                            <Item
                                icon={<SportsOutlinedIcon />}
                                title="Coaches"
                                to="/coaches"
                                selected={selected}
                                setSelected={setSelected}
                            />
                        </>
                    )}
                    {isAuthenticated && role === "physio" ? (
                        <Item
                            icon={<PersonAddAltOutlinedIcon />}
                            title="Create New User"
                            to="/create-new-user"
                            selected={selected}
                            setSelected={setSelected}
                        />
                    ) : (
                        <Item
                            icon={<AssignmentIndOutlinedIcon />}
                            title="Weekly Form"
                            to="/weekly-form"
                            selected={selected}
                            setSelected={setSelected}
                        />
                    )}
                </Menu>
            </ProSidebar>
        </Box>
    );
}
