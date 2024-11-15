export type AuthContextType = {
	token: string | null;
	login: (newToken: string) => void;
	logout: () => void;
 };
 