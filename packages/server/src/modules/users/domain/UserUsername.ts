import { ValueObject } from "@core/core/domain/ValueObject"
import validator from "validator";
import { Result } from "@core/logic/Result";
import { Guard } from "@core/logic/Guard";

interface UserUsernameProps {
  value: string;
}

export class UserUsername extends ValueObject<UserUsernameProps> {
  get value (): string {
    return this.props.value;
  }

  private constructor(props: UserUsernameProps) {
    super(props);
  }

  private static hasAproppriateLength(value: string): boolean {
    return (
      value.length <= 50
    );
  }

  private static hasCorrectValue(value: string): boolean {
    return (
      validator.isAlphanumeric(value)
    );
  }

  public static create(props: UserUsernameProps): Result<UserUsername> {
    const usernameResult = Guard.againstNullOrUndefined(props.value, 'username');

    if (!usernameResult.succeeded) {
      return Result.fail<UserUsername>(usernameResult.message)
    } else if (!this.hasAproppriateLength(props.value)) {
      return Result.fail<UserUsername>('The username should be length more than 50 characters')
    } else if (!this.hasCorrectValue(props.value)) {
      return Result.fail<UserUsername>('The username no has the correct format');
    } else {
      return Result.ok<UserUsername>(
        new UserUsername({
          value: props.value,
        }),
      );
    }
  }
}