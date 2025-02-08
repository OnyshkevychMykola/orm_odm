import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToMany,
    BaseEntity,
    BeforeUpdate
} from 'typeorm';
import { Question } from './Question';

@Entity()
export class Quest extends BaseEntity {

    @PrimaryGeneratedColumn()
    // @ts-ignore
    id: number;

    @Column({ length: 50 })
    // @ts-ignore
    title: string;

    @Column({ type: 'text', nullable: true })
    // @ts-ignore
    description?: string;

    @OneToMany(() => Question, (question) => question.quest)
    // @ts-ignore
    questions: Question[];

    @BeforeUpdate()
    logUpdate() {
        console.log(`Квест оновлено: ${this.title}`);
    }
}
