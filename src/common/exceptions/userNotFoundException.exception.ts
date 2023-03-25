import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {
    constructor(private id: number) {
      super(`${id} not found`);
    }
  }