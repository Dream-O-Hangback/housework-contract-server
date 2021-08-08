import { JwtPayload } from '../../src/auth/interfaces';

export {};

declare global {
    namespace Express {
        interface User {
            id: string;
        }
        export interface Request {
            user?: JwtPayload;
        }
    }
}
