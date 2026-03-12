import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/* 
entity setup for the positions table
id - auto generated on insert
x - x position of robot
y - y position of robot
facing - direction the robot is facing
timestamp - timestamp the position was added.
*/
@Entity()
export class Position {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  x: string;

  @Column()
  y: string;

  @Column()
  facing: string;

  @Column({
    type: 'text',
    default: () => 'CURRENT_TIMESTAMP',
  })
  timestamp: Date;
}
