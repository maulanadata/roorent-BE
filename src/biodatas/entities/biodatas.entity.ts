import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Biodatas {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 16
    })
    nik: string;

    @Column({
        type: 'varchar',
        length: 25
    })
    first_name: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    last_name: string;

    @Column({
        type:'date'
    })
    birth_date: Date;

    @Column({
        type: 'varchar',
        length: 255
    })
    photo_profile: string;

    @Column({
        type: 'char',
        length: 13
    })
    telephone: string;
    
    @Column({
        type: 'varchar',
        length: 255
    })
    photo_ktp: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    address: string;

    @Column({
        default: false,
    })
    isActive: boolean;
    
    @CreateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
      createdAt: Date;
    
      @UpdateDateColumn({
        type: 'timestamp with time zone',
        nullable: false,
      })
      updatedAt: Date;
    
      @DeleteDateColumn({
        type: 'timestamp with time zone',
        nullable: true,
      })
      deletedAt: Date;

    }