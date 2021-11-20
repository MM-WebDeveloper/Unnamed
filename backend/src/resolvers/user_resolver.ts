import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import {
  PasswordValidator,
  EmailValidator,
  UsernameValidator,
} from '../helpers/validators';
import { User, UserModel } from '../entities/user';

@ObjectType()
class RegisterResponse {
  @Field(() => Boolean)
  success: boolean;
  @Field(() => String, { nullable: true })
  error?: string;

  constructor(success: boolean, error?: string) {
    this.success = success;
    this.error = error;
  }
}

@ObjectType()
class LoginResponse {
  @Field(() => String, { nullable: true })
  accessToken?: string;
  @Field(() => String, { nullable: true })
  error?: string;

  constructor(accessToken: string, error?: string) {
    this.accessToken = accessToken;
    this.error = error;
  }
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => RegisterResponse)
  async register(
    @Arg('email') email: string,
    @Arg('username') username: string,
    @Arg('password') password: string,
    @Arg('confirmPassword') confirmPassword: string
  ): Promise<RegisterResponse> {
    try {
      if (EmailValidator(email)) {
        return new RegisterResponse(false, 'Invalid email.');
      }

      const emailExists = await UserModel.findOne({ email });

      if (emailExists) {
        return new RegisterResponse(false, 'This email is already registered.');
      }

      if (UsernameValidator(username)) {
        return new RegisterResponse(false, 'Choose your username.');
      }

      const usernameExists = await UserModel.findOne({ username });

      if (usernameExists) {
        return new RegisterResponse(false, 'This username is already taken.');
      }

      if (PasswordValidator(password)) {
        return new RegisterResponse(
          false,
          'Password is too weak.\n8 characters minimum.\nUse special characters (#!¤%).\nUse digits, small and capital letters.'
        );
      }

      if (password !== confirmPassword) {
        return new RegisterResponse(false, `Passwords don't match.`);
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User(email, username, hashedPassword);

      const doc = new UserModel(user);
      await doc.save();

      return new RegisterResponse(true);
    } catch (error) {
      return new RegisterResponse(false, '500 || Internal Server Error');
    }
  }

  @Mutation(() => LoginResponse)
  async login() {
    return new LoginResponse('token');
  }
}
