export type User = {
    firstName?: string;
    lastName?: string;
    role?:string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    gender?: string;
    age?: number;
    phone?: string;
    address?: {
        street?:string
        city?: string;
        state?: string;
        zipCode?: string;
    };
    
};
