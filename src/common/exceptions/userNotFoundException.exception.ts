import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(private id: number) {
      super(`user with id ${id} not found`);
    }
  }