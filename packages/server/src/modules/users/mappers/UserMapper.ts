import { User } from "../domain/User";

export class UserMap {
  public static async toPersistence (user: User): Promise<any> {
    return {
      username: user.username.value,
      email: user.email.email,
      password: await user.password.getHashedValue(),
      name: user.fullname.name,
      fatherSurname: user.fullname.fatherSurname,
      motherSurname: user.fullname.motherSurname
    }
  }
}