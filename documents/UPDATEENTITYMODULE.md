# `Updating HRIS Users Related Entities`


In order to update any entities, you have to make sure that **`uid`** for a specific entity is part of the entity payload that you want to supply in the request body.

**`E.g:`**:
I will take `User Entity` payload for reference

* **`Updating Entity Normal Properties`**

    If you want to update **`phonenumber`** of user in the following user payload from being `null` to **`0712-000-000`**
    ```typescript
        {
            "created":      "2019-10-03T13:03:53.403Z",
            "lastUpdated":  "2019-10-03T13:03:53.403Z",
            "uid":          "JaXlPhzMIiH",
            "username":     "John Bob Doe",
            "firstName":    "John",
            "middleName":   "Bob",
            "surname":      "Doe",
            "email":        "johnbobdoe@example.com",
            "phoneNumber":  null,
            "jobTitle":     null,
            "lastLogin":    null,
            "expiryDate":   null,
            "deletedDate":  null,
            "enabled":      true,
            "token":        "Sm9obiBCb2IgRG9lOnVuZGVmaW5lZA==",
            "userRoles": [

            ],
            "userGroups": [

            ],
            "dashboardCharts": [

            ],
            "messages": [

            ],
            "forms": [

            ],
            "organisationUnits": [

            ],
            "userSettings": null
        }
    ```

    To update the above user for the phonenumber only the following request body payload is going to be supplied

    ```typescript
        {
            "uid":          "JaXlPhzMIiH",
            "phoneNumber":  "0712-000-000",
        }
    ```

    Then the payload is sent to the following example URL
    URL: **`localhost:3000/api/users/JaXlPhzMIiH`**

    * Make sure the **`uid`** for the user is in the payload. **`uid`** is mandatory **`uid: JaXlPhzMIiH`**

    The Update User:
    ```typescript
        {
            "created":      "2019-10-03T13:03:53.403Z",
            "lastUpdated":  "2019-10-03T13:03:53.403Z",
            "uid":          "JaXlPhzMIiH",
            "username":     "John Bob Doe",
            "firstName":    "John",
            "middleName":   "Bob",
            "surname":      "Doe",
            "email":        "johnbobdoe@example.com",
            "phoneNumber":  "0712-000-000",
            "jobTitle":     null,
            "lastLogin":    null,
            "expiryDate":   null,
            "deletedDate":  null,
            "enabled":      true,
            "token":        "Sm9obiBCb2IgRG9lOnVuZGVmaW5lZA==",
            "userRoles": [

            ],
            "userGroups": [

            ],
            "dashboardCharts": [

            ],
            "messages": [

            ],
            "forms": [

            ],
            "organisationUnits": [

            ],
            "userSettings": null
        }
    ```

* **`Updating Entity Relationship With Other Entities`**

    If you want to update **`User Role, User Group`**

    * `User Role Example:`
    ```typescript
        {
            "created": "2019-10-04T13:17:54.194Z",
            "lastUpdated": "2019-10-04T13:17:54.194Z",
            "uid": "65MpUk5ekyh",
            "name": "Superuser",
            "description": "User with Superuser privilege",
            "userAuthorities": [
                {
                    "created": "2019-10-04T13:17:27.516Z",
                    "lastUpdated": "2019-10-04T13:17:27.516Z",
                    "uid": "sxkSemdC3GP",
                    "name": "Apps Management Authority",
                    "description": "Authority to manage Apps"
                }
            ]
        }
    ```

    * `User Group Example:`
    ```typescript
        {
            "name": "Data Manager HRIS",
            "description": "User Group For Data Managers",
            "created": "2019-10-03T19:12:32.459Z",
            "lastUpdated": "2019-10-03T19:12:32.459Z",
            "uid": "ApRP9vb3cW6"
        }
    ```


    ```typescript
        {
            "created":      "2019-10-03T13:03:53.403Z",
            "lastUpdated":  "2019-10-03T13:03:53.403Z",
            "uid":          "JaXlPhzMIiH",
            "username":     "John Bob Doe",
            "firstName":    "John",
            "middleName":   "Bob",
            "surname":      "Doe",
            "email":        "johnbobdoe@example.com",
            "phoneNumber":  null,
            "jobTitle":     null,
            "lastLogin":    null,
            "expiryDate":   null,
            "deletedDate":  null,
            "enabled":      true,
            "token":        "Sm9obiBCb2IgRG9lOnVuZGVmaW5lZA==",
            "userRoles": [
                
            ],
            "userGroups": [

            ],
            "dashboardCharts": [

            ],
            "messages": [

            ],
            "forms": [

            ],
            "organisationUnits": [

            ],
            "userSettings": null
        }
    ```
    * In order to update `User` with the above mentioned `Role` and `Group` the following payload is going to be sent as request body.

        `NOTE: ` The `IDs` for the the `Role` and `Group` relationship are going to be supplied by to the section as in object to the relationship specific section as shown below
    ```typescript
        {
            "created":      "2019-10-03T13:03:53.403Z",
            "lastUpdated":  "2019-10-03T13:03:53.403Z",
            "uid":          "JaXlPhzMIiH",
            "username":     "John Bob Doe",
            "firstName":    "John",
            "middleName":   "Bob",
            "surname":      "Doe",
            "email":        "johnbobdoe@example.com",
            "phoneNumber":  null,
            "jobTitle":     null,
            "lastLogin":    null,
            "expiryDate":   null,
            "deletedDate":  null,
            "enabled":      true,
            "token":        "Sm9obiBCb2IgRG9lOnVuZGVmaW5lZA==",
            "userRoles": [
                {
                    "uid": "65MpUk5ekyh"
                }
            ],
            "userGroups": [
                {
                    "uid": "ApRP9vb3cW6"
                }
            ],
            "dashboardCharts": [

            ],
            "messages": [

            ],
            "forms": [

            ],
            "organisationUnits": [

            ],
            "userSettings": null
        }
    ```

    The final updated user with specific relationship
    ```typescript
        {
            "created":      "2019-10-03T13:03:53.403Z",
            "lastUpdated":  "2019-10-03T13:03:53.403Z",
            "uid":          "JaXlPhzMIiH",
            "username":     "John Bob Doe",
            "firstName":    "John",
            "middleName":   "Bob",
            "surname":      "Doe",
            "email":        "johnbobdoe@example.com",
            "phoneNumber":  null,
            "jobTitle":     null,
            "lastLogin":    null,
            "expiryDate":   null,
            "deletedDate":  null,
            "enabled":      true,
            "token":        "Sm9obiBCb2IgRG9lOnVuZGVmaW5lZA==",
            "userRoles": [
                {
                    "created": "2019-10-04T13:17:54.194Z",
                    "lastUpdated": "2019-10-04T13:17:54.194Z",
                    "uid": "65MpUk5ekyh",
                    "name": "Superuser",
                    "description": "User with Superuser privilege",
                    "userAuthorities": [
                        {
                            "created": "2019-10-04T13:17:27.516Z",
                            "lastUpdated": "2019-10-04T13:17:27.516Z",
                            "uid": "sxkSemdC3GP",
                            "name": "Apps Management Authority",
                            "description": "Authority to manage Apps"
                        }
                    ]
                }
            ],
            "userGroups": [
                {
                    "name": "Data Manager HRIS",
                    "description": "User Group For Data Managers",
                    "created": "2019-10-03T19:12:32.459Z",
                    "lastUpdated": "2019-10-03T19:12:32.459Z",
                    "uid": "ApRP9vb3cW6"
                }
            ],
            "dashboardCharts": [

            ],
            "messages": [

            ],
            "forms": [

            ],
            "organisationUnits": [

            ],
            "userSettings": null
        }
    ```