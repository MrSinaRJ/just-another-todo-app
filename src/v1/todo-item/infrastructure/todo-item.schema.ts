import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';
import { Document } from 'mongoose';

export type TodoItemDocument = TodoItem & Document;

@Schema({
  timestamps: true,
})
export class TodoItem {
  @Prop({ default: randomUUID() })
  _id: string;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  priority: number;

  @Prop({ type: String, ref: 'TodoList', required: true })
  todoListId: string;
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem);
