import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('participant')
export class Participant{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phonenumber: string;

    @Column()
    vegan: boolean;

    @Column()
    vegetarian: boolean;

    @Column()
    english_speaker: boolean;

    @Column()
    german_speaker: boolean;

    @Column({
        nullable:true,
    })
    street: string;

    @Column({
        nullable:true,
    })
    house_number: number;

    @Column()
    host: boolean;

    @Column()
    appetizer: boolean;

    @Column()
    main_course: boolean;

    @Column()
    dessert: boolean;

    @Column({
        nullable:true,
    })
    comment: string;

    @Column()
    isVerified: boolean;

    @Column()
    isPaid: boolean;
}