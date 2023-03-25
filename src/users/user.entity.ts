import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({nullable: false, type: 'varchar', length: 120 })
  public name!: string;

  @Column({nullable: false, type: 'varchar', length: 120 })
  public tell!: string;

  @Column({nullable: true, type: 'varchar', length: 120 })
  public email!: string;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}