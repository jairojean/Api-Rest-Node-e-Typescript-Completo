import { RequestHandler } from "express";



type tvalidation= ()=> RequestHandler;
export const validation: tvalidation  = ()=>  async(req, res, next)=>{
        console.log("Validation no middle");
};




