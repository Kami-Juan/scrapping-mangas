import { ValueObject } from "@core/core/domain/ValueObject";
import validator from "validator";
import { Result } from "@core/logic/Result";
import { Guard } from "@core/logic/Guard";

interface UserEmailProps {
  value: string;
}

export class UserEmail extends ValueObject<UserEmailProps> {
  get email(): string {
    return this.props.value;
  }

  private constructor(props: UserEmailProps) {
    super(props);
  }

  private static hasAproppriateLength(value: string): boolean {
    return (
      value.length <= 120
    );
  }

  private static hasCorrectValue(value: string): boolean {
    return (
      validator.isEmail(value)
    );
  }

  public static create(props: UserEmailProps): Result<UserEmail> {
    const emailResult = Guard.againstNullOrUndefined(props.value, 'email');

    if (!emailResult.succeeded) {
      return Result.fail<UserEmail>(emailResult.message)
    } else if (!this.hasAproppriateLength(props.value)) {
      return Result.fail<UserEmail>('The email should be length more than 120 characters')
    } else if (!this.hasCorrectValue(props.value)) {
      return Result.fail<UserEmail>('The email no has the correct format');
    } else {
      return Result.ok<UserEmail>(
        new UserEmail({
          value: props.value,
        }),
      );
    }
  }
}