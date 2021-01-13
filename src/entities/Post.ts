import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
@Entity()
export class Post {
  @Field()
  @PrimaryKey()
  id!: number;
  @Field(()=>String)
  @Property({ type:"date"})
  createdAt = new Date();
  @Field(()=>String)
  @Property({ type:"date",onUpdate: () => new Date() })
  updatedAt = new Date();
  @Field()
  @Property({type:"text"})
  title!: string;

//   @ManyToOne() // when you provide correct type hint, ORM will read it for you
//   author!: User;

//   @ManyToMany() // owning side can be simple as this!
//   tags = new Collection<BookTag>(this);

//   constructor(title: string, author: Author) {
//     this.title = title;
//     this.author = author;
//   }

}