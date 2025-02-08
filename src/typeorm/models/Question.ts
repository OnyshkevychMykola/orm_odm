import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    BaseEntity
} from 'typeorm';
import { Quest } from './Quest';

@Entity()
export class Question extends BaseEntity {
    @PrimaryGeneratedColumn()
    // @ts-ignore
    id: number;

    @Column()
    // @ts-ignore
    text: string;

    @Column()
    // @ts-ignore
    answer: string;

    @ManyToOne(() => Quest, (quest) => quest.questions)
    // @ts-ignore
    quest: Quest;
}
