import {Injectable} from "@angular/core";
import {DefaultDataService, HttpUrlGenerator} from "@ngrx/data";
import {Post} from "../models/posts.model";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable()

export class PostsDataService extends DefaultDataService<Post> {
  constructor(http: HttpClient, httpUrlGenerator: HttpUrlGenerator) {
    super('Post', http, httpUrlGenerator)
  }

  override getAll(): Observable<Post[]> {
    return this.http.get<Post[]>(`https://todos-81b5e-default-rtdb.firebaseio.com/posts.json`)
      .pipe(
        map(data => {
          const posts: Post[] = [];
          for (const key in data) {
            posts.push({...data[key], id: key});
          }
          return posts;
        })
      );
  }
}
