import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
export class User {
  @Field()
  @prop({ required: true })
  public email: string;

  @prop({ required: true })
  public password: string;

  constructor(email: string, password: string) {
    this.email = email;
    this.password = password;
  }
}

export const UserModel = getModelForClass(User);
