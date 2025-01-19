import { Donor } from "../donor/donor";
import { Gift } from "../gift.model";
import { User } from "../user/user.model";

export class RaffleResponse {
    public id:number=0;
    public gift!:Gift;
    public user!:User;

}