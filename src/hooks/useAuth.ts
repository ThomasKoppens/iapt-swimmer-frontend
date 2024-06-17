// useAuth.ts
const useAuth = () => {
    const storedAuthState = localStorage.getItem("authState");
    let authState = {
        isAuthenticated: false,
        role: null,
        id: null,
        firstName: "",
    };
    if (storedAuthState) {
        authState = JSON.parse(storedAuthState);
    }

    const login = (role: string, id: number | undefined, firstName: string) => {
        localStorage.setItem(
            "authState",
            JSON.stringify({ isAuthenticated: true, role, id, firstName })
        );
    };

    const logout = () => {
        localStorage.setItem(
            "authState",
            JSON.stringify({
                isAuthenticated: false,
                role: null,
                id: null,
                firstName: "",
            })
        );
    };

    return {
        isAuthenticated: authState.isAuthenticated,
        role: authState.role,
        id: authState.id,
        firstName: authState.firstName,
        login,
        logout,
    };
};

export default useAuth;
