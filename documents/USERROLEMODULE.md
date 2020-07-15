# `HRIS User Groups`

* [What contains in `HRIS Users Role`?](#what-is-hris-users-role)
* [User Role `Entity`](#entity-columns)
  * [`Entity` class definition](#entity-class-definition)
  * [`Entity` CRUD operation](#entity-crud-operation)
    * [`Entity POST`](#entity-post)
    * [`Entity GET`](#entity-get)
    * [`Entity DELETE`](#entity-delete)
    * [`Entity PUT`](#entity-put)

### What is HRIS Users Role?
[HRHIS](http://hrhis.moh.go.tz/login) User Role is the mandate given to system users to allow them have different access controls to system services and data.


### User Role `Entity`
* #### `User Role Entity` class definition
```typescript
    export abstract class TransactionTimestamp extends HRISBaseEntity {
        @CreateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
        created: Date;

        @UpdateDateColumn({ type: 'timestamp', default: () => 'LOCALTIMESTAMP' })
        lastUpdated: Date;

        @BeforeInsert()
        beforeInsertTransaction() {
            this.created = new Date();
            this.lastUpdated = new Date();
        }

        @BeforeInsert()
        beforeUpdateTransaction() {
            this.lastUpdated = new Date();
        }
    }


    export class UserCoreProps extends TransactionTimestamp {
        @Column({ select: false })
        @Generated('increment')
        id: number;

        @PrimaryColumn({ type: 'varchar', length: 256, unique: true })
        uid: string;

        @JoinColumn({ referencedColumnName: 'id' })
        createdBy: User;

        @JoinColumn({ referencedColumnName: 'id' })
        lastUpdatedBy: User;

        @BeforeInsert()
        beforeInsertEntityCoreProps() {
            /**
             *  You can generate UUID in different ways
             *  1. You can generate uuid of any length: i.e getUid('', 20)
             *      Example of UUID::: 8aydSxYBrrP
             *  2. You can generat UUID by prepending a context specific keyword i.e getUid('HRIS', 20)
             *      Example of UUID::: HRIS_8aydSxYBrrP
             */
            this.uid = getUid('', 11);
        }
    }


    export class UserIdentification extends UserCoreProps {
        @JoinColumn({ name: 'createdbyid' })
        createdBy: User;

        @JoinColumn({ name: 'lastupdatedbyid' })
        lastUpdatedBy: User;
    }
    

    export class UserRole extends UserIdentification {
        static plural = 'userRoles';

        @Column({ type: 'varchar', length: 64 })
        name: string;

        @Column({ type: 'text', nullable: true })
        description: string | null;
    }
```

* #### `User Role Entity` CRUD Operation
    `Local URL: localhost:3000/api/userRoles/`

    `If you have a registered domain: http://www.example.com/api/userRoles/`
    * **`User Group Entity POST`**

        `URL: localhost:3000/api/userRoles/`

        * **`Entity POST PAYLOAD`**

        ```typescript
            {
                "name": "Superuser",
                "description": "User with Superuser privilege"
            }
        ```

        * **`Entity POST RESPONSE`**

        ```typescript
            {
                "name": "Superuser",
                "description": "User with Superuser privilege",
                "created": "2019-10-03T19:38:48.911Z",
                "lastUpdated": "2019-10-03T19:38:48.911Z",
                "uid": "fUvCgpPbz3t"
            }
        ```
    * **`Entity PUT`**

        `URL: localhost:3000/api/userRoles/fUvCgpPbz3t`

        * **`Entity UPDATE PAYLOAD`**

        ```typescript
            {
                "name": "Superuser",
                "description": "User with Superuser privilege",
                "uid": "fUvCgpPbz3t"
            }
        ```
        * **`Entity UPDATE RESPONSE`**

        ```typescript
            {
                "message": "Object with id fUvCgpPbz3t updated successfully."
            }
        ```
    * **`Entity GET`**
    
        `URL: localhost:3000/api/userRoles/{INSERT ENTITY UID}`

        `Example::: localhost:3000/api/userRoles/ApRP9vb3cW6`

        * **`Entity GET RESPONSE`**
    
        ```typescript
            {
                "created": "2019-10-03T19:38:48.911Z",
                "lastUpdated": "2019-10-03T19:38:48.911Z",
                "uid": "fUvCgpPbz3t",
                "name": "Superuser",
                "description": "User with Superuser privilege",
                "userAuthorities": [

                ]
            }
        ```
    * **`Entity DELETE`**
    
        `URL: localhost:3000/api/userRoles/{INSERT ENTITY UID}`

        `Example::: localhost:3000/api/userRoles/fUvCgpPbz3t`

        * **`Entity DELETE RESPONSE`**
        ```typescript
            {
                "message": "Object with id fUvCgpPbz3t deleted successfully"
            }
        ```
