import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

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

  @Column({nullable: true, type: 'varchar', length: 20 })
  public password!: string;  
  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}