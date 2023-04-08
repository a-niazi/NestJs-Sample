import { NotFoundException } from '@nestjs/common';

export class UserNotFoundException extends NotFoundException {   
    // public constructor(private id: number) {
    //   super(`user with id ${id} not found`);
    // }
    public constructor() {
      super('user not found');
    }

}