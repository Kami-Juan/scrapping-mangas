import { ValueObject } from '@core/core/domain/ValueObject';
import { Result } from '@core/logic/Result';
import { Guard } from '@core/logic/Guard';


interface UserCompleteNameProps {
  name: string;
  fatherSurname: string;
  motherSurname: string;
}

export class UserCompleteName extends ValueObject<UserCompleteNameProps> {
  private constructor(props: UserCompleteNameProps) {
    super(props);
  }

  get name(): string {
    return this.props.name;
  }

  get fatherSurname(): string {
    return this.props.fatherSurname;
  }

  get motherSurname(): string {
    return this.props.motherSurname;
  }

  private static hasAproppriateLength(value: string): boolean {
    return (
      value.length <= 120
    );
  }

  private static hasCorrectValue(value: string): boolean {
    return (
      /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/.test(value)
    );
  }

  public static create(props: UserCompleteNameProps): Result<UserCompleteName> {
    const nameResult = Guard.againstNullOrUndefined(props.name, 'name');
    const fatherSurnameResult = Guard.againstNullOrUndefined(
      props.fatherSurname,
      'fatherSurname',
    );
    const motherSurnameResult = Guard.againstNullOrUndefined(
      props.motherSurname,
      'motherSurname',
    );

    if (
      !nameResult.succeeded ||
      !fatherSurnameResult.succeeded ||
      !motherSurnameResult.succeeded
    ) {
      return Result.fail<UserCompleteName>(
        `${nameResult.message}, ${fatherSurnameResult.message}, ${motherSurnameResult.message}`,
      );
    } else if (!this.hasAproppriateLength(props.name)) {
      return Result.fail<UserCompleteName>(
        `The name no has the correct longitude`,
      );
    } else if (!this.hasAproppriateLength(props.fatherSurname)) {
      return Result.fail<UserCompleteName>(
        `The father surname no has the correct longitude`,
      );
    } else if (!this.hasAproppriateLength(props.motherSurname)) {
      return Result.fail<UserCompleteName>(
        `The mother surname name no has the correct longitude`,
      );
    } else if (!this.hasCorrectValue(props.name)) {
      return Result.fail<UserCompleteName>(
        `The name should be have letters`,
      );
    }
    else if (!this.hasCorrectValue(props.fatherSurname)) {
      return Result.fail<UserCompleteName>(
        `The mother surname should be have letters`,
      );
    }
    else if (!this.hasCorrectValue(props.motherSurname)) {
      return Result.fail<UserCompleteName>(
        `The mother surname should be have letters`,
      );
    }
    else {
      return Result.ok<UserCompleteName>(
        new UserCompleteName({
          name: props.name,
          fatherSurname: props.fatherSurname,
          motherSurname: props.motherSurname,
        }),
      );
    }
  }
}
