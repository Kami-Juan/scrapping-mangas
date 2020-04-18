import { Injectable } from "@nestjs/common";
import { BaseController } from "@core";
import { CreateUserUseCase } from "./CreateUserUseCase";
import { CreateUserDTO } from "./CreateUserDTO";
import { CreateUserErrors } from "./CreateUserErrors";

@Injectable()
export class CreateUserController extends BaseController{
  constructor(private useCase: CreateUserUseCase) {
    super();
  }

  async executeImpl(): Promise<any> {
    const dto: CreateUserDTO = this.req.body as CreateUserDTO;

    try {

      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const errors = result.value;

        console.log(errors.constructor)

        switch (errors.constructor) {
          case CreateUserErrors.AccountAlreadyExists:
            return this.conflict(errors.errorValue().message)
          default:
            return this.fail(errors.errorValue().message);
        }
      } else {
        return this.ok(this.res);
      }

    } catch(e) {
      return this.fail(e);
    }
  }
}