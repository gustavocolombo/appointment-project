import {
  CreateDateColumn, UpdateDateColumn, PrimaryGeneratedColumn, Column, Entity,
} from 'typeorm';

@Entity('appointments')
export default class Appointment {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  date: Date;

  @Column()
  provider: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
