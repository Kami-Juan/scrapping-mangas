import { ValueObject } from "@core/core/domain/ValueObject";
import { Result } from "@core/logic/Result";
import { UserUsername } from "./UserUsername";
import { UserPassword } from "./UserPassword";
import { UserEmail } from "./UserEmail";
import { UserCompleteName } from "./UserCompleteName";

interface UserProps {
  username: UserUsername;
  password: UserPassword;
  email: UserEmail;
  fullName: UserCompleteName;
}

export class User extends ValueObject<UserProps> {

  get username(): UserUsername {
    return this.props.username;
  }

  get password(): UserPassword {
    return this.props.password;
  }

  get email(): UserEmail {
    return this.props.email;
  }

  get fullname(): UserCompleteName {
    return this.props.fullName
  }

  private constructor(props: UserProps) {
    super(props);
  }

  public static create(props: UserProps): Result<User> {
    const user = new User({
      ...props
    })

    return Result.ok<User>(user);
  }
}