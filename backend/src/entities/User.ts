import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  @prop({ required: true })
  public email: string;

  @Field()
  @prop({ required: true })
  public username: string;

  @prop({ required: true })
  public password: string;

  @prop({ default: false })
  public confirmed: boolean;

  constructor(
    email: string,
    username: string,
    password: string,
    confirmed: boolean
  ) {
    this.email = email;
    this.username = username;
    this.password = password;
    this.confirmed = confirmed;
  }
}

export const UserModel = getModelForClass(User);
