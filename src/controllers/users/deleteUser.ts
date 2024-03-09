import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;

  AppDataSource.initialize().then(async () => {
    const user = new User()
    user.id = Number(userId)
    await AppDataSource.manager.remove(user)
    
    AppDataSource.destroy();
    return res
      .status(200)
      .json({ success: true, message: "User data has Deleted" });
  }).catch(error => {
    AppDataSource.destroy();
    return res
    .status(500)
    .json({ success: false, data: error, message: "DB ERROR" });
  });
};

export default deleteUser;
