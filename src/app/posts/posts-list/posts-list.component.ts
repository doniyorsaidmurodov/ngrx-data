import { Component, OnInit } from '@angular/core';
import {PostService} from "../post.service";
import {Post} from "../../models/posts.model";
import {Observable} from "rxjs";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts$: Observable<Post[]>;

  constructor(private postService: PostService) { }

  ngOnInit(): void {
    this.posts$ = this.postService.entities$;
  }

  deletePost($event: Event, id: string) {
    $event.preventDefault();
    if (confirm('Are you sure to delete the post?')) {
      this.postService.delete(id);
    }
  }
}
