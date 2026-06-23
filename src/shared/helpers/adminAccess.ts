import type { User } from "firebase/auth";

type TokenClaims = Record<string, unknown>;

const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS ?? '')
    .split(',')
    .map((email: string) => email.trim().toLowerCase())
    .filter(Boolean);

export const isAdminByEmail = (email?: string | null) => {
    if (!email) {
        return false;
    }

    return adminEmails.includes(email.toLowerCase());
};

export const isAdminByClaims = (claims?: TokenClaims | null) => {
    if (!claims) {
        return false;
    }

    return claims.admin === true || claims.role === 'admin';
};

export const isAdminUser = async (user: User | null) => {
    if (!user) {
        return false;
    }

    if (isAdminByEmail(user.email)) {
        return true;
    }

    try {
        const tokenResult = await user.getIdTokenResult();
        return isAdminByClaims(tokenResult.claims);
    } catch {
        return false;
    }
};
