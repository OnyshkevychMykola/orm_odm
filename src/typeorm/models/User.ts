import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    BaseEntity, ManyToMany, JoinTable
} from 'typeorm';
import {Quest} from "./Quest";

@Entity()
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    id: number;

    @Column()
    // @ts-ignore
    username: string;

    @Column({ unique: true })
    // @ts-ignore
    email: string;

    @ManyToMany(() => Quest)
    @JoinTable()
    // @ts-ignore
    quests: Quest[];
}
