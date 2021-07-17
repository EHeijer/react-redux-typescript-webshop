export interface IRole {
    id?: number;
    roleName?: RoleType;
}

export enum RoleType {
    ROLE_ADMIN = "ROLE_ADMIN",
    ROLE_EMPLOYEE = "ROLE_EMPLOYEE",
    ROLE_CUSTOMER = "ROLE_CUSTOMER"
}