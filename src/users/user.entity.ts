import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Role } from 'src/common/enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: false, type: 'varchar', length: 100 })
  public name!: string;

  @Column({nullable: false, type: 'varchar', length: 11 })
  public tell!: string;

  @Column({nullable: true, type: 'varchar', length: 100 })
  public email!: string;

  @Column({nullable: true, type: 'varchar', length: 30 })
  public username!: string;

  @Column({nullable: true, type: 'varchar', length: 200 })
  public password!: string;  
  /*
   * Create and Update Date Columns
   */
  @Column({
    type: 'numeric',
    array: true,
    default: '{}'
  })
  roles: Role[];


  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}