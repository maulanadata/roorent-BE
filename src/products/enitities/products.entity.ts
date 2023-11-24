import { Cities } from "#/cities/entities/cities.entity";
import { ProductDescriptions } from "#/product_descriptions/entities/product_descriptions.entity";
import { SpecialRules } from "#/special_rules/entities/special_rules.entity";
import { Users } from "#/users/entities/user.entity";
import { Column, CreateDateColumn, DeleteDateColumn, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { forwardRef } from '@nestjs/common';

export class Products {
    @ManyToOne(() => Cities, (cities) => cities.products)
    cities: Cities;

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'varchar',
        length: 120
    })
    name: string;

    @Column({
        type: 'varchar',
        length: 25
    })
    type: string;

    @Column({
        type: 'int',
        nullable: true,
    })
    stock: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    daily_price: number;

    @Column({
        type: 'int',
        nullable: true,
    })
    monthly_price: number;

    @Column({
        type: 'varchar',
        length: 255
    })
    address: string;

    @Column({
        default: false,
        nullable: true,
      })
      active_status: boolean;

    @Column({
        type: 'varchar',
        length: 255
    })
    latitude: string;

    @Column({
        type: 'varchar',
        length: 255
    })
    longitude: string;

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
    
    // @ManyToOne(() => Users, (user) => user.products)
    // user: Users;

    @OneToOne(() => ProductDescriptions)
    @JoinColumn()
    productDescriptions: ProductDescriptions;

    @OneToOne(() => SpecialRules)
    @JoinColumn()
    specialRules: SpecialRules;
}