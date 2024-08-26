import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '@common/auth/jwt-auth.guard';
import { TodoItemService } from './application/todo-item.service';

@Controller('todo-items')
@UseGuards(JwtAuthGuard)
export class TodoItemController {
  constructor(private readonly todoItemService: TodoItemService) {}

  @Post(':todoListId')
  async create(
    @Req() req,
    @Param('todoListId') todoListId: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('priority') priority: number,
  ) {
    return this.todoItemService.create(
      req.user.userId,
      todoListId,
      title,
      description,
      priority,
    );
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body('title') title: string,
    @Body('description') description: string,
    @Body('priority') priority: number,
  ) {
    return this.todoItemService.update(
      req.user.userId,
      id,
      title,
      description,
      priority,
    );
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    return this.todoItemService.delete(req.user.userId, id);
  }
}
