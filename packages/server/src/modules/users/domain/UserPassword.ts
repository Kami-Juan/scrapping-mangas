import { ValueObject } from "@core/core/domain/ValueObject";
import * as bcrypt from "bcrypt";
import { Result } from "@core/logic/Result";
import { Guard } from "@core/logic/Guard";

interface UserPasswordProps {
  value: string;
  hashed?: boolean;
}

export class UserPassword extends ValueObject<UserPasswordProps> {
  private constructor(props: UserPasswordProps) {
    super(props)
  }

  public async comparePassword (plainTextPassword: string): Promise<boolean> {
    let hashed: string;
    if (this.isAlreadyHashed()) {
      hashed = this.props.value;
      return this.bcryptCompare(plainTextPassword, hashed);
    } else {
      return this.props.value === plainTextPassword;
    }
  }

  private bcryptCompare (plainText: string, hashed: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(plainText, hashed, (err, compareResult) => {
        if (err) return resolve(false);
        return resolve(compareResult);
      })
    })
  }

  public isAlreadyHashed (): boolean {
    return this.props.hashed;
  }

  private hashPassword (password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hash) => {
        if (err) return reject(err);
        resolve(hash)
      })
    })
  }

  public getHashedValue (): Promise<string> {
    return new Promise((resolve) => {
      if (this.isAlreadyHashed()) {
        return resolve(this.props.value);
      } else {
        return resolve(this.hashPassword(this.props.value))
      }
    })
  }

  private static hasAproppriateLength(value: string): boolean {
    return (
      value.length <= 250
    );
  }

  public static create(props: UserPasswordProps): Result<UserPassword> {
    const passwordResult = Guard.againstNullOrUndefined(props.value, 'password');

    if (!passwordResult.succeeded) {
      return Result.fail<UserPassword>(passwordResult.message);
    } else if (!props.hashed && !this.hasAproppriateLength(props.value)) {
      return Result.fail<UserPassword>('The email should be length less or equals than 250 characters');
    } else {
      return Result.ok<UserPassword>(new UserPassword({
        value: props.value,
        hashed: !!props.hashed === true
      }))
    }
  }
}