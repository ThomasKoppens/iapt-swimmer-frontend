import useAuth from "../../hooks/useAuth";
import AthleteDashboard from "./athleteGraphs";
import TeamDashboard from "./teamGraphs";

const Dashboard = () => {
    const { role, firstName } = useAuth();

    if (role === null) return <p>Loading...</p>;

    switch (role) {
        case "swimmer":
            return <AthleteDashboard firstName={firstName} />;
        case "coach":
        case "physio":
            return <TeamDashboard />;
        default:
            return <p>Invalid role</p>;
    }
};

export default Dashboard;
