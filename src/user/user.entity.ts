import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class common_user {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "first_name", type: "varchar", length: 16})
  public firstName: string;

  @Column({ name: "last_name", type: "varchar", length: 16})
  public lastName: string;

  @CreateDateColumn({ name: "create_date_time", type: 'timestamp' })
  public createDateTime: Date;

  @CreateDateColumn({ name: "update_date_time", type: 'timestamp' })
  public updateDateTime: Date;
}
