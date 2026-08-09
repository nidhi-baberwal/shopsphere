import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {

    try{
    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({
            message: "Authorization Header Missing"
    });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(
        token, 
        process.env.JWT_SECRET as string
    ) as {userId: number};

    req.userId = decoded.userId;
    next();

    

} catch(error){
    console.log(error);

    return res.status(401).json({
        message: "Invalid or expired token"
    });
}
}