import {BaseEntity,Column,Entity,Index,JoinColumn,JoinTable,ManyToMany,ManyToOne,OneToMany,OneToOne,PrimaryColumn,PrimaryGeneratedColumn,RelationId} from "typeorm";
import { Form} from "./form";
import {Field} from "./hris_field";


@Entity("hris_form_fieldmembers",{schema:"public" } )
@Index("idx_c4bcec9b443707b0",["field_",])
@Index("idx_c4bcec9b5ff69b7d",["form_",])
export class hris_form_fieldmembers {

   
    @ManyToOne(type => Form, hris_form=>hris_form.hris_form_fieldmemberss,{ primary:true, nullable:false,onDelete: 'CASCADE', })
    @JoinColumn({ name:'form_id'})
    form_: Form | null;


   
    @ManyToOne(type=>Field, Field=>Field.hris_form_fieldmemberss,{ primary:true, nullable:false,onDelete: 'CASCADE', })
    @JoinColumn({ name:'field_id'})
    field_:Field | null;


    @Column("integer",{ 
        nullable:false,
        name:"sort"
        })
    sort:number;
        
}
