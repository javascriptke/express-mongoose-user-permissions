class Role {
  private _permisions: number;
  private _name: string;

  constructor() {
    this._permisions = 0;
  }

  public get permissions(): number {
    return this._permisions;
  }

  public get name(): string {
    return this._name;
  }
  /**
   *
   * Add user role
   */
  addPermission = (permission: number): void => {
    if (!this.hasPermission(permission)) {
      this._permisions += permission;
    }
  };
  /**
   *
   * Remove user role
   */
  removePermission = (permission: number): void => {
    if (this.hasPermission(permission)) {
      this._permisions -= permission;
    }
  };
  /**
   *
   * Check is a user has a given role
   *
   */
  hasPermission = (permission: number): boolean => {
    return (this.permissions & permission) === permission;
  };

  resetPermissions = (): void => {
    this._permisions = 0;
  };
}

enum UserPermissions {
  FOLLOW = 1,
  COMMENT = 2,
  WRITE = 4,
  MODERATE = 8,
  ADMIN = 16,
}

const role1 = new Role();
role1.addPermission(UserPermissions.WRITE);
role1.addPermission(UserPermissions.COMMENT);
role1.removePermission(UserPermissions.FOLLOW);

console.log(role1.hasPermission(UserPermissions.COMMENT));
