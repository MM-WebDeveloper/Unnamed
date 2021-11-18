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
class Error {
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
class UserResponse {
  @Field({ nullable: true })
  user?: User;
  @Field(() => [Error], { nullable: true })
  error?: Error[];
}

@Resolver()
export class UserResolver {
  @Query(() => String)
  hello() {
    return 'hello';
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('email') email: string,
    @Arg('password') password: string
  ): Promise<UserResponse> {
    try {
      const errors: Error[] = [];

      if (EmailValidator(email)) {
        errors.push(new Error('Email', 'Invalid email.'));
      }

      if (PasswordValidator(password)) {
        errors.push(
          new Error(
            'Password',
            'Password has to contain atleast 8 characters, 1 uppercase letter, 1 lowercase letter, 1 digit and 1 special character.'
          )
        );
      }

      const exists = await UserModel.findOne({ email });

      if (exists) {
        errors.push(new Error('Email', 'This email is already registered.'));
      }

      if (errors.length > 0) {
        return {
          error: errors,
        };
      }

      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User(email, hashedPassword);

      const doc = new UserModel(user);
      await doc.save();

      return { user };
    } catch (error) {
      console.log(error);
      return {
        error: [new Error('Internal', '500 || Internal Server Error')],
      };
    }
  }
}
