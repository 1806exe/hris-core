# `HRIS User Authority`

* [What contains in `HRIS Users Authority`?](#what-is-hris-users-authority)
* [User Authority `Entity`](#entity-columns)
  * [`Entity` class definition](#entity-class-definition)
  * [`Entity` CRUD operation](#entity-crud-operation)
    * [`Entity POST`](#entity-post)
    * [`Entity GET`](#entity-get)
    * [`Entity DELETE`](#entity-delete)
    * [`Entity PUT`](#entity-put)

### What is HRIS Users Authority?
[HRHIS](http://hrhis.moh.go.tz/login) User Authority give users the rights to enforce particular operation based on the system operations. 


### User Authority `Entity`
* #### `User Authority Entity` class definition
```typescript
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
        static plural = 'userAuthorities';

        @Column({ type: 'varchar', length: 64 })
        name: string;

        @Column({ type: 'text', nullable: true })
        description: string | null;
    }
    

```

* #### `User Authority Entity` CRUD Operation
    `Local URL: localhost:3000/api/userAuthorities/`

    `If you have a registered domain: http://www.example.com/api/userAuthorities/`
    * **`User Authority Entity POST`**

        `URL: localhost:3000/api/userAuthorities/`

        * **`Entity POST PAYLOAD`**

        ```typescript
            {
                "name": "Apps Management",
                "description": "Authority to manage Apps"
            }
        ```

        * **`Entity POST RESPONSE`**

        ```typescript
            {
                "name": "Apps Management",
                "description": "Authority to manage Apps",
                "created": "2019-10-04T10:55:22.827Z",
                "lastUpdated": "2019-10-04T10:55:22.827Z",
                "uid": "Gl5kx7cpcOp"
            }
        ```
    * **`Entity PUT`**

        `URL: localhost:3000/api/userAuthorities/Gl5kx7cpcOp`

        * **`Entity UPDATE PAYLOAD`**

        ```typescript
            {
                "name": "Apps Management Authority",
                "description": "Authority to manage Apps",
                "uid": "Gl5kx7cpcOp"
            }
        ```
        * **`Entity UPDATE RESPONSE`**

        ```typescript
            {
                "message": "Item with id Gl5kx7cpcOp updated successfully."
            }
        ```
    * **`Entity GET`**
    
        `URL: localhost:3000/api/userAuthorities/{INSERT ENTITY UID}`

        `Example::: localhost:3000/api/userAuthorities/Gl5kx7cpcOp`

        * **`Entity GET RESPONSE`**
    
        ```typescript
            {
                "created": "2019-10-04T10:55:22.827Z",
                "lastUpdated": "2019-10-04T10:56:39.294Z",
                "uid": "Gl5kx7cpcOp",
                "name": "Apps Management Authority",
                "description": "Authority to manage Apps"
            }
        ```
    * **`Entity DELETE`**
    
        `URL: localhost:3000/api/userAuthorities/{INSERT ENTITY UID}`

        `Example::: localhost:3000/api/userAuthorities/Gl5kx7cpcOp`

        * **`Entity DELETE RESPONSE`**
        ```typescript
            {
                "message": "Object with id Gl5kx7cpcOp deleted successfully"
            }
        ```
