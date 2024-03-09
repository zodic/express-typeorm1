import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const getUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  AppDataSource.initialize().then(async () => {
    const userById = await AppDataSource.manager.findOneBy(User,{id:Number(userId)})

    AppDataSource.destroy();
    if(typeof userById.id !== "undefined"){
      return res.status(200).json({ success: true, data: userById });
    }else{
      return res.status(200).json({ success: false, message: "Invalid ID" });
    }
    
  }).catch(error => {
    AppDataSource.destroy();
    return res
    .status(500)
    .json({ success: false, data: error, message: "DB ERROR" });
  })
};

export default getUser;
