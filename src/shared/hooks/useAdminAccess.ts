import { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { isAdminUser } from "../helpers/adminAccess";

export const useAdminAccess = () => {
    const auth = getAuth();
    const [user, loading] = useAuthState(auth);
    const [isAdmin, setIsAdmin] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        let isActive = true;

        const checkAccess = async () => {
            if (loading) {
                return;
            }

            setChecking(true);
            const result = await isAdminUser(user ?? null);

            if (isActive) {
                setIsAdmin(result);
                setChecking(false);
            }
        };

        checkAccess();

        return () => {
            isActive = false;
        };
    }, [loading, user]);

    return {
        isAdmin,
        checking: loading || checking,
    };
};
