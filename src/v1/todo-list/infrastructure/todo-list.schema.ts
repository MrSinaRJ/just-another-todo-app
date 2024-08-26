import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type TodoListDocument = TodoList & Document;

@Schema({
  timestamps: true,
})
export class TodoList {
  @Prop({ default: randomUUID() })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true, type: String, ref: 'User' })
  userId: string;

  @Prop({ type: [{ type: String, ref: 'TodoItem' }] })
  todoItems: string[];
}

export const TodoListSchema = SchemaFactory.createForClass(TodoList);
