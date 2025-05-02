import { Response } from "express";

export const handleError = (res: Response, error: any, message: string) => {
  console.error(error);
  res.status(500).send(message);
};
