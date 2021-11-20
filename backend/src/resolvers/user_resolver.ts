import {
  Arg,
  Field,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import bcrypt from 'bcryptjs';
import { PasswordValidator, EmailValidator } from '../helpers/validators';
import { User, UserModel } from '../entities/user';

@ObjectType()
class BackendError {
  @Field()
  field: string;
  @Field()
  message: string;

  constructor(field: string, message: string) {
    this.field = field;
    this.message = message;
  }
}

@ObjectType()
class RegisterResponse {
  @Field(() => Boolean)
  success: Boolean;
  @Field(() => BackendError, { nullable: true })
  error?: BackendError;

  constructor(success: Boolean, error?: BackendError) {
    this.success = success;
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
        return new RegisterResponse(
          false,
          new BackendError('Email', 'Invalid email.')
        );
      }

      const emailExists = await UserModel.findOne({ email });

      if (emailExists) {
        return new RegisterResponse(
          false,
          new BackendError('Email', 'This email is already registered.')
        );
      }

      const usernameExists = await UserModel.findOne({ username });

      if (usernameExists) {
        return new RegisterResponse(
          false,
          new BackendError('Username', 'This username is already taken.')
        );
      }

      if (PasswordValidator(password)) {
        return new RegisterResponse(
          false,
          new BackendError(
            'Password',
            'Password is too weak.\n8 characters minimum.\nUse special characters (#!¤%).\nUse digits, small and capital letters.'
          )
        );
      }

      if (password !== confirmPassword) {
        return new RegisterResponse(
          false,
          new BackendError('Password', `Passwords don't match.`)
        );
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User(email, username, hashedPassword);

      const doc = new UserModel(user);
      await doc.save();

      return new RegisterResponse(true);
    } catch (error) {
      console.log(error);
      return new RegisterResponse(
        false,
        new BackendError('Internal', '500 || Internal Server Error')
      );
    }
  }
}
