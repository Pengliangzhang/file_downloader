import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class common_file {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public scenario_name: string;

  @Column()
  public check_name: string;

  @Column()
  public check_alias: string;

  @Column()
  public xml_type: string;  

  @Column()
  public blob: Buffer;

  @Column()
  public file_name: string;

  @Column()
  public isVaild: number;

  @Column()
  public downloaded: number;

  @Column()
  public created_user: string;

  @Column()
  public updated_user: string;

  @CreateDateColumn({ type: 'timestamp' })
  public create_date_time: Date;

  @CreateDateColumn({ type: 'timestamp' })
  public update_date_time: Date;
}
