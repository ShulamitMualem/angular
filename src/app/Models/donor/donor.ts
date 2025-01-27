import { Gift } from "../gift.model";

export class Donor {
    public id:number=0;
    public firstName: string = '';
    public lastName: string = '';
    public email:string="";
    public myGiftsList!: Gift[];
}
