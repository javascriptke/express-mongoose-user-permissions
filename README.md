# Node js Auth Roles with MongoDb and typescript
What will you learn from this?
---
- Mongoose custom methods
- Mongoose static methods
- Integrating mongoose with `Typescript`
- Virtual fields
- building permission system with `Node js`
...

In this setup the permissions are executed using bitwise operators ie. (`AND`|`OR`|`XOR`) -> `~&|^`

It's effectiveness is the flexibility to add different permissions(Custom permissions).

I've emulated a blog site permissions that has the following roles:

- Comment on a post
- View a post
- Like a given post
- Moderate the comment,likes on a post i.e Moderatoe
- Overall Admin (The platform owner with all permissions)


-------
| Role issued| Role Name | Role value |
| :-------------------------------------------------------------- | :------- | :--------: |
| Read only, No permission provided                               |   None    |     0      |
| View on a post                                                  |   VIEW    |     1      |
| Comment on a post                                               |  COMMENT  |     2      |
| Like a post                                                     |   LIKE    |     4      |
| Moderate on posts activities                                    | MODERATE  |     8      |
| Administrate the blog activities and the overal site activities |   ADMIN   |     16     |
---

On cloning this repo use the `.env.example` to setup the `.env` file 


### Development

Once cloned
```sh
$ cd <dir_name>
$ yarn # To install all the dependencie
$ yarn run dev:start
$
```
When the project is running the first thing you need populate all the roles in the project

A  `POST` request to the  `{BASE_URL}/roles/insert` route to populate the given roles declared

To get the present roles run a get request on the 
`{BASE_URL}/roles` route.

Much can be extended from this setup:

Emulation of the same: 
This is a class base way of implementing the Model and adding, removing, resetiting permissions

```ts
class Role {
  private _permissions: number;
  private _name: string;

  constructor() {
    this._permissions = 0;
  }

  public get permissions(): number {
    return this._permissions;
  }

  public get name(): string {
    return this._name;
  }

   //* Add user role
  addPermission = (permission: number): void => {
    if (!this.hasPermission(permission)) {
      this._permissions += permission;
    }
  };
   // * Remove user role
  removePermission = (permission: number): void => {
    if (this.hasPermission(permission)) {
      this._permissions -= permission;
    }
  };

   //* Check is a user has a given role
  hasPermission = (permission: number): boolean => {
    return (this.permissions & permission) === permission;
  };
   //* Reset all permissions
  resetPermissions = (): void => {
    this._permissions = 0;
  };
}

enum Permissions {
  FOLLOW = 1,
  COMMENT = 2,
  WRITE = 4,
  MODERATE = 8,
  ADMIN = 16,
}

const role1 = new Role();
role1.addPermission(Permissions.WRITE);
role1.addPermission(Permissions.COMMENT);
role1.removePermission(Permissions.FOLLOW);

console.log(role1.hasPermission(Permissions.COMMENT));
```

The project is open for Development and anyone wishing to help extend the codebase. I would highly appreciate


