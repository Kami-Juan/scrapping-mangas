import { Injectable } from "@nestjs/common";
import { UserRepository } from "../../repository/UserRepository";
import { UseCase } from "@core";
import { CreateUserDTO } from "./CreateUserDTO";
import { Either, Result } from "@core/logic/Result";
import { CreateUserErrors } from "./CreateUserErrors";
import { UserCompleteName } from "../../domain/UserCompleteName";

type Response = Either<CreateUserErrors.AccountAlreadyExists | Result<any>, Result<any>>;

@Injectable()
export class CreateUserUseCase implements UseCase<CreateUserDTO, Promise<Response>>{
  constructor(private userRepository: UserRepository) {}

  async execute (request: CreateUserDTO): Promise<Response> {

    const { username, password, name, email, fatherSurname, motherSurname } = request;

    const fullNameOrError = UserCompleteName.create({ name, fatherSurname, motherSurname });

    return null;
  }
}