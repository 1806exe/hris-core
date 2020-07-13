# `HRIS User Groups`

* [What contains in `HRIS Users Group`?](#what-is-hris-users-group)
* [User Group `Entity`](#entity-columns)
  * [`Entity` class definition](#entity-class-definition)
  * [`Entity` CRUD operation](#entity-crud-operation)
    * [`Entity POST`](#entity-post)
    * [`Entity GET`](#entity-get)
    * [`Entity DELETE`](#entity-delete)
    * [`Entity PUT`](#entity-put)

### What is HRIS Users Group?
[HRHIS](http://hrhis.moh.go.tz/login) User Group is collection of list of users that share the common responsibilities or classed together.


### User Group `Entity`
* #### `User Group Entity` class definition
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
    
    
    export class UserGroup extends UserCoreProps {
    static plural = 'userGroups';

    @Column({ type: 'varchar', length: 256 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description: string | null;
    }
```

* #### `User Group Entity` CRUD Operation
    `Local URL: localhost:3000/api/userGroups/`

    `If you have a registered domain: http://www.example.com/api/userGroups/`
    * **`User Group Entity POST`**

        `URL: localhost:3000/api/userGroups/`

        * **`Entity POST PAYLOAD`**

        ```typescript
            {
                "name": "Data Manager HRIS",
                "description": "User Group For Data Managers"
            }
        ```

        * **`Entity POST RESPONSE`**

        ```typescript
            {
                "name": "Data Manager HRIS",
                "description": "User Group For Data Managers",
                "created": "2019-10-03T19:12:32.459Z",
                "lastUpdated": "2019-10-03T19:12:32.459Z",
                "uid": "ApRP9vb3cW6"
            }
        ```
    * **`Entity PUT`**

        `URL: localhost:3000/api/userGroups/ApRP9vb3cW6`

        * **`Entity UPDATE PAYLOAD`**

        ```typescript
            {
                "name": "Data Manager HRIS",
                "description": "User Group For Data HRIS Managers",
                "uid": "ApRP9vb3cW6"
            }
        ```
        * **`Entity UPDATE RESPONSE`**

        ```typescript
            {
                "message": "Object with id ApRP9vb3cW6 updated successfully."
            }
        ```
    * **`Entity GET`**
    
        `URL: localhost:3000/api/userGroups/{INSERT ENTITY UID}`

        `Example::: localhost:3000/api/userGroups/ApRP9vb3cW6`

        * **`Entity GET RESPONSE`**
    
        ```typescript
            {
                "created": "2019-10-03T19:12:32.459Z",
                "lastUpdated": "2019-10-03T19:14:11.559Z",
                "uid": "ApRP9vb3cW6",
                "name": "Data Manager HRIS",
                "description": "User Group For Data HRIS Managers"
            }
        ```
    * **`Entity DELETE`**
    
        `URL: localhost:3000/api/userGroups/{INSERT ENTITY UID}`

        `Example::: localhost:3000/api/userGroups/ApRP9vb3cW6`

        * **`Entity DELETE RESPONSE`**
        ```typescript
            {
                "message": "Object with id ApRP9vb3cW6 deleted successfully"
            }
        ```
