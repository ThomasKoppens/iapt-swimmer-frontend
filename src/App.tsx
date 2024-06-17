import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./scenes/dashboard";
import Settings from "./scenes/settings";
import Profile from "./scenes/profile";
import Topbar from "./scenes/global/Topbar";
import CreateNewUser from "./scenes/create-new-user";
import Sidebar from "./scenes/global/Sidebar";
import LoginForm from "./scenes/login";
import WeeklyForm from "./scenes/weekly-form";
import useAuth from "./hooks/useAuth";
import Athletes from "./scenes/athletes";
import AthleteDashboard from "./scenes/dashboard/athleteGraphs";
import Coaches from "./scenes/coaches";

function App() {
    const [theme, colorMode] = useMode("dark");

    const { isAuthenticated, role } = useAuth();
    console.log(`isAuth: ${isAuthenticated}`);
    return (
        <ColorModeContext.Provider value={colorMode}>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {isAuthenticated ? (
                    <div className="app">
                        <Sidebar />
                        <main className="content">
                            <Topbar />
                            <Routes>
                                <Route path="/" element={<Dashboard />} />
                                <Route path="/profile" element={<Profile />} />
                                <Route
                                    path="/settings"
                                    element={<Settings />}
                                />
                                {isAuthenticated && role === "physio" ? (
                                    <Route
                                        path="/create-new-user"
                                        element={<CreateNewUser />}
                                    />
                                ) : (
                                    <Route
                                        path="/weekly-form"
                                        element={<WeeklyForm />}
                                    />
                                )}
                                {isAuthenticated && role === "physio" && (
                                    <>
                                        <Route
                                            path="/athletes"
                                            element={<Athletes />}
                                        />
                                        <Route
                                            path="/coaches"
                                            element={<Coaches />}
                                        />
                                        <Route
                                            path="/athletes/:firstName"
                                            element={<AthleteDashboard />}
                                        />
                                    </>
                                )}
                            </Routes>
                        </main>
                    </div>
                ) : (
                    <Routes>
                        <Route path="/login" element={<LoginForm />} />
                        <Route path="*" element={<Navigate to="/login" />} />
                    </Routes>
                )}
            </ThemeProvider>
        </ColorModeContext.Provider>
    );
}

export default App;
