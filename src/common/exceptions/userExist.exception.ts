import { NotFoundException } from '@nestjs/common';

export class UserExistException extends NotFoundException {
    constructor() {
      super('User already exist');
    }
  }