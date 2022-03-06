import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class File {
  @PrimaryGeneratedColumn()
  public id: number;

  /* fileType stands for the final purpose of the file:
   * - uploaded: uploaded files (from grapesjs template editor)
   * - report: generated report pdf or image files
   * - signature: user's signature images
   */
  @Column()
  public fileType: string;

  @Column()
  public fileDir: string;

  @Column()
  public fileName: string;

  @Column()
  public mimeType: string;

  @Column()
  public originalName: string;
}
