import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const getUsers = async (req: Request, res: Response) => {
  AppDataSource.initialize().then(async () => {
    const allUsers = await AppDataSource.manager.find(User)

    AppDataSource.destroy();
    if(allUsers.length > 0){
      return res.status(200).json({ success: true, data: allUsers });
    }else{
      return res.status(200).json({ success: false, message: "Empty" });
    }
      
  }).catch(error => {
    AppDataSource.destroy();
    return res
    .status(500)
    .json({ success: false, data: error, message: "DB ERROR" });
  });
}

export default getUsers;
