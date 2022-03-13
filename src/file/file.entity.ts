import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class common_file {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column({ name: "scenario_name", type: "varchar", length: 16 })
  public scenarioName: String;

  @Column({ name: "check_name", type: "varchar", length: 32 })
  public checkName: String;

  @Column({ name: "check_alias", type: "varchar", length: 32 })
  public checkAlias: String;

  @Column({ name: "xml_type", type: "varchar", length: 8 })
  public xmlType: String;  

  @Column()
  public blob: Buffer;

  @Column({ name: "file_name", type: "varchar", length: 32 })
  public fileName: String;

  @Column({name: "isVaild"})
  public isVaild: number;

  @Column({name: "downloaded"})
  public downloaded: number;

  @Column({ name: "created_user", type: "varchar", length: 16 })
  public createdUser: String;

  @Column({ name: "updated_user", type: "varchar", length: 16 })
  public updatedUser: String;

  @CreateDateColumn({ name: 'create_date_time', type: 'timestamp' })
  public createDateTime: Date;

  @CreateDateColumn({ name: 'update_date_time', type: 'timestamp' })
  public updateDateTime: Date;
}
