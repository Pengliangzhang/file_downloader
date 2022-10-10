import { Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, PrimaryColumn } from 'typeorm';

@Entity("COMMON_FILE")
export class common_file {
  @PrimaryColumn({ name: "ID", type: "varchar", length: 36 })
  public ID: String;

  @Column({ name: "SCENARIONAME", type: "varchar", length: 32 })
  public scenarioName: String;

  @Column({ name: "CHECKNAME", type: "varchar", length: 64 })
  public checkName: String;

  @Column({ name: "CHECKALIAS", type: "varchar", length: 64 })
  public checkAlias: String;

  @Column({ name: "XMLTYPE", type: "varchar", length: 64 })
  public xmlType: String;  

  @Column({ name: "BLOB" })
  public blob: Buffer;

  @Column({ name: "FILENAME", type: "varchar", length: 64 })
  public fileName: String;

  @Column({name: "ISVAILD", type: "boolean" })
  public isVaild: Boolean;

  @Column({ name: "DOWNLOADED" })
  public downloaded: number;

  @Column({ name: "CREATEDUSER", type: "varchar", length: 32 })
  public createdUser: String;

  @CreateDateColumn({ name: 'CREATEDDATETIME', type: 'timestamp' })
  public createDateTime: Date;

  @CreateDateColumn({ name: 'UPDATEDDATETIME', type: 'timestamp' })
  public updateDateTime: Date;
}
