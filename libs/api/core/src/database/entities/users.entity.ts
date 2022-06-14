import { IUser } from "@node-talks/shared";
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('users')
export class User implements IUser {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  providerId: string

  @Column()
  provider: string

  @Column()
  username: string

  @Column()
  token: string

  @CreateDateColumn({ type: 'time with time zone' })
  createdAt: Date

  @UpdateDateColumn({ type: 'time with time zone' })
  updatedAt: Date
}