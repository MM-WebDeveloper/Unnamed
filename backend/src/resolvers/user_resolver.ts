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
class UserResponse {
  @Field({ nullable: true })
  user?: User;
  @Field(() => BackendError, { nullable: true })
  error?: BackendError;
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
      if (EmailValidator(email)) {
        return { error: new BackendError('Email', 'Invalid email.') };
      }

      const exists = await UserModel.findOne({ email });

      if (exists) {
        return {
          error: new BackendError('Email', 'This email is already registered.'),
        };
      }

      if (PasswordValidator(password)) {
        return {
          error: new BackendError(
            'Password',
            'Password has to contain:\n8 characters minimum\n1 uppercase letter\n1 lowercase letter\n1 digit\n1 special character (#!@¤)'
          ),
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
        error: new BackendError('Internal', '500 || Internal Server Error'),
      };
    }
  }
}
