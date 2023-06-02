import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class CredentialsOutput {
    @Field(()=>String)
    access_token: string;
}