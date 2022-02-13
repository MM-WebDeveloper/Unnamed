import { Request, Response } from 'express-serve-static-core';

export interface ContextType {
	request: Request;
	response: Response;
	payload?: {
		userId: string;
	};
}
