import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import {Field} from "./hris_field";


@Entity("hris_field_relation",{schema:"public" } )
@Index("idx_2f7ffbc98f3e7cb",["child_field",])
@Index("idx_2f7ffbc997c4d1fb",["parent_field",])
export class hris_field_relation {

   
    @ManyToOne(type=>Field, Field=>Field.hris_field_relations,{ primary:true, nullable:false,onDelete: 'CASCADE', })
    @JoinColumn({ name:'parent_field'})
    parent_field:Field | null;


   
    @ManyToOne(type=>Field, Field=>Field.hris_field_relations2,{ primary:true, nullable:false,onDelete: 'CASCADE', })
    @JoinColumn({ name:'child_field'})
    child_field:Field | null;

}
