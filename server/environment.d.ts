import { IUser } from "./src/models/user.model";

declare global {
    namespace Express {
        interface Request {
            user: {
                id: IUser['id'];
            }
        }
    }
    namespace NodeJS {
        export interface ProcessEnv {
            NODE_ENV: 'development' | 'production';
            PORT: number;
            JWT_SECRET: string;
            MONGO_URI: string;
        }
    }
}

export {};