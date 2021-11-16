import { getModelForClass, prop } from '@typegoose/typegoose';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
class User {
  @Field()
  @prop()
  public name: string;

  @Field()
  @prop()
  public age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }
}

export const UserModel = getModelForClass(User);
