import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Transform } from 'class-transformer';
import { CreateDateColumn, DeleteDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@ObjectType({ isAbstract: true })
export abstract class CommonEntity {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  id: number;

  @CreateDateColumn({ type: 'text' })
  @Field(() => String)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  createdAt: Date;

  @UpdateDateColumn({ type: 'text' })
  @Field(() => String)
  @Transform(({ value }) => new Date(value), { toClassOnly: true })
  updatedAt: Date;

  @DeleteDateColumn({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  @Transform(({ value }) => (value ? new Date(value) : null), { toClassOnly: true })
  deletedAt: Date | null;
}
