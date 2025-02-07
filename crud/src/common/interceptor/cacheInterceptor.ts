import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { of, tap } from "rxjs";

export class CacheInterceptor implements NestInterceptor {

    private responseInCache: Map<string, object> = new Map();

    async intercept(
        context: ExecutionContext,
        next: CallHandler<any>) {

            setInterval(() => {
                if(this.responseInCache.size > 0) {
                    console.log("Clearing cache storage")
                    this.responseInCache.clear();
                }
            }, 2000)
        
            const requestUrl: string = context.switchToHttp().getRequest().url;

            if(this.responseInCache.has(requestUrl)) {
                console.log("cache storage response")
                return of(this.responseInCache.get(requestUrl));
            }

            return next.handle().pipe(
                tap((responseData => {
                    this.responseInCache.set(requestUrl, responseData);
                    console.log("Saving into cache storage")
                }))
            );
    }
}