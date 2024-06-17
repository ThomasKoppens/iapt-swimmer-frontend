import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { useEffect } from "react";
import AthleteForm from "./swimmerForm";
import CoachForm from "./coachForm";

const WeeklyForm = () => {
    const { isAuthenticated, role } = useAuth();
    console.log(isAuthenticated, role);
    const navigate = useNavigate();

    // Send user to login page in case they haven't logged in yet
    useEffect(() => {
        if (!isAuthenticated) navigate("/login");
    }, [isAuthenticated, navigate]);

    // Serve the form corresponding to their role
    if (role === null) return;
    switch (role) {
        case "swimmer":
            return <AthleteForm />;
        case "coach":
            return <CoachForm />;
    }
};

export default WeeklyForm;
