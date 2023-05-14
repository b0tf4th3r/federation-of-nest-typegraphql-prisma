import { Directive, Field, Int, ObjectType } from 'type-graphql'

@Directive(`@key(fields: "id")`)
@ObjectType()
export class Worker {
  @Field(() => Int)
  id!: number
}
