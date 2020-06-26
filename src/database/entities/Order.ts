import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('orders')
class Order {
  @PrimaryGeneratedColumn('increment')
  orderId: number;

  @Column('varchar')
  userCpf: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userCpf' })
  user: User;

  @CreateDateColumn()
  date: Date;

  @Column()
  status: string;

  @Column('numeric', { precision: 5, scale: 2 })
  orderValue: number;

  @Column('int')
  cashbackPercentage: number;

  @Column('numeric', { precision: 5, scale: 2 })
  cashbackValue: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

export default Order;
