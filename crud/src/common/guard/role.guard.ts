import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class RoleGuard implements CanActivate {

    private roleToAccept: ["admin"|"user"]

    constructor(roleToAccept: ["admin"|"user"]) {
        this.roleToAccept = roleToAccept
    }

    canActivate(
        context: ExecutionContext
    ): boolean | Promise<boolean> | Observable<boolean> {
      
        const requestInfo = context.switchToHttp().getRequest();
        const userRole: string = requestInfo.user.role; 

        console.log(this.roleToAccept)

        if(this.roleToAccept.find((x) => x === userRole)) {
            return true;
        } 

        return false;
    }
}