import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { request } from "http";
import { Observable } from "rxjs";

export class AuthorizationInterceptor implements NestInterceptor {
    intercept(
        context: ExecutionContext,
        next: CallHandler<any>
    ): Observable<any> | Promise<Observable<any>> {

        const requestInfo = context.switchToHttp().getRequest();

        console.log(requestInfo)

        const authorization: string|undefined = requestInfo.headers?.authorization;
        if(!authorization) {
            throw new HttpException('User not Authorized', HttpStatus.FORBIDDEN)
        }
        return next.handle();
        
    }
}