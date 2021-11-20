import { getModelForClass, mongoose, prop } from '@typegoose/typegoose';
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

  constructor(email: string, username: string, password: string) {
    this.email = email;
    this.username = username;
    this.password = password;
  }
}

export const UserModel = getModelForClass(User);
