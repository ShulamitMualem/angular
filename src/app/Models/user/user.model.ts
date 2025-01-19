export enum RoleType{
   "ADMIN"=1,
    "USER"=2
}
export class User {
    public id:number=0;
    public firstName: string = '';
    public lastName: string = '';
    public email:string="";
    public password:string="";
    public phone:string="";
    public role:RoleType=RoleType.USER
}
