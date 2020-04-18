import { Result } from "@core/logic/Result";
import { UseCaseError } from "@core/logic/UseCaseError";

export namespace CreateUserErrors {
  export class AccountAlreadyExists extends Result<UseCaseError> {
    constructor() {
      super(false, {message: 'The email user is already set'} as UseCaseError)
    }
  }
}