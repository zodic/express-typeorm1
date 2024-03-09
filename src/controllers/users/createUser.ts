import { Request, Response } from "express";
import { AppDataSource } from "../../data-source";
import { User } from "../../entity/User";

const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, age }: { firstName: string; lastName: string; age: number } = req.body;

  if (!firstName) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "FirstName is required" });
  }

  if (!lastName) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "LastName is required" });
  }

  if (!age) {
    return res
      .status(400)
      .json({ success: false, data: null, message: "Age is required" });
  }
  
  AppDataSource.initialize().then(async () => {
    const user = new User()
    user.firstName = firstName
    user.lastName = lastName
    user.age = age
    await AppDataSource.manager.save(user)
    
    AppDataSource.destroy();
    return res.status(201).json({
      success: true,
      data: { firstName, lastName },
      message: "New user has created",
    });
  }).catch(error => {
    AppDataSource.destroy();
    return res
    .status(500)
    .json({ success: false, data: error, message: "DB ERROR" });
  })

};


export default createUser;
