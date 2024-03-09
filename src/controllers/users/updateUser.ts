import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const updateUser = async (req: Request, res: Response) => {
  const { firstName, lastName, age }: { firstName: string; lastName: string; age: number } = req.body;
  const { userId } = req.params;

  AppDataSource.initialize().then(async () => {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide user_id to update" });
    }
    if (!firstName && !lastName) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide field to update" });
    }

    const userById = await AppDataSource.manager.findOneBy(User,{id:Number(userId)})

    if (firstName) {
      userById.firstName = firstName;
    }
    if (lastName) {
      userById.lastName = lastName;
    }
    if (age) {
      userById.age = age;
    }

    await AppDataSource.manager.save(userById);

    AppDataSource.destroy();
    return res
      .status(200)
      .json({ success: true, message: "User data has Updated" });
  }).catch(error => {
    AppDataSource.destroy();
    return res
    .status(500)
    .json({ success: false, data: error, message: "DB ERROR" });
  });
};

export default updateUser;
