import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {PostService} from "./post.service";
import {first, map, mergeMap, Observable, of, tap} from "rxjs";

@Injectable()

export class PostsResolver implements Resolve<boolean>{
  constructor(private postsService: PostService) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.postsService.loaded$.pipe(
      tap((loaded) => {
        if (!loaded) {
          this.postsService.getAll();
        }
      }),
      first()
      // mergeMap((loaded: boolean) => {
      //   if (loaded) {
      //     return of(true)
      //   }
      //
      //   return this.postsService.getAll().pipe(
      //     map(posts => {
      //       return !!posts;
      //     })
      //   )
      // }),
      // first()
    )
  }

}
