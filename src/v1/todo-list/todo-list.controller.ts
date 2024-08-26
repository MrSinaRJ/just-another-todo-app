import { JwtAuthGuard } from '@common/auth/jwt-auth.guard';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { TodoListService } from './application/todo-list.service';

@Controller('todo-lists')
@UseGuards(JwtAuthGuard)
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  async create(@Req() req, @Body('title') title: string) {
    return this.todoListService.create(req.user.userId, title);
  }

  @Patch(':id')
  async update(
    @Req() req,
    @Param('id') id: string,
    @Body('title') title: string,
  ) {
    return this.todoListService.update(req.user.userId, id, title);
  }

  @Delete(':id')
  async delete(@Req() req, @Param('id') id: string) {
    return this.todoListService.delete(req.user.userId, id);
  }

  @Get()
  async findAllByUser(@Req() req) {
    return this.todoListService.findAllByUser(req.user.userId);
  }
}
