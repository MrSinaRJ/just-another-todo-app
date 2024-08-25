import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Prop()
  _id: string;

  @Prop({ type: String, required: true, unique: true })
  username: string;

  @Prop({ type: String, required: true })
  password: string;

  @Prop({ type: [{ type: String, ref: 'TodoList' }] })
  todoLists: string[];
}

export const UserSchema = SchemaFactory.createForClass(User);
