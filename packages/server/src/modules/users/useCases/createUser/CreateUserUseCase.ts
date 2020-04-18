import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/UserRepository";
import { UseCase } from "@core";
import { CreateUserDTO } from "./CreateUserDTO";
import { Either, Result, left, right } from "@core/logic/Result";
import { CreateUserErrors } from "./CreateUserErrors";
import { UserCompleteName } from "../../domain/UserCompleteName";
import { UserEmail } from "../../domain/UserEmail";
import { UserUsername } from "../../domain/UserUsername";
import { UserPassword } from "../../domain/UserPassword";
import { User } from "../../domain/User";
import { GenericAppError } from "@core/logic/AppError";

type Response = Either<CreateUserErrors.AccountAlreadyExists | Result<any>, Result<any>>;

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>>{
  constructor(private userRepository: UserRepository) {}

  async execute (request: CreateUserDTO): Promise<Response> {

    const { username, password, name, email, fatherSurname, motherSurname } = request;

    const fullNameOrError = UserCompleteName.create({ name, fatherSurname, motherSurname });
    const emailOrError = UserEmail.create({ value: email });
    const usernameOrError = UserUsername.create({ value: username });
    const passwordOrError = UserPassword.create({ value: password });

    const combineResults = Result.combine([fullNameOrError, emailOrError, usernameOrError, passwordOrError]);

    if (combineResults.isFailure) {
      return left(Result.fail<void>(combineResults.error)) as Response;
    }

    const userOrError = User.create({
      email: emailOrError.getValue(),
      fullName: fullNameOrError.getValue(),
      password: passwordOrError.getValue(),
      username: usernameOrError.getValue()
    })

    if (userOrError.isFailure) {
      return left(Result.fail<void>(userOrError.error)) as Response;
    }

    const user: User = userOrError.getValue();

    const userAlreadyExists = await this.userRepository.exists(user.email.email);

    if (userAlreadyExists) {
      return left(new CreateUserErrors.AccountAlreadyExists()) as Response
    }

    try {
      await this.userRepository.save(user);
    } catch (err) {
      return left(new GenericAppError.UnexpectedError(err)) as Response;
    }

    return right(Result.ok<void>()) as Response;
  }
}