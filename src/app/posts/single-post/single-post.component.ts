import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PostService} from "../post.service";
import {Observable} from "rxjs";
import {Post} from "../../models/posts.model";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post: Post;

  constructor(
    private route: ActivatedRoute,
    private postService: PostService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];

    this.postService.entities$.subscribe(posts => {
      this.post = posts.find(p => p.id === id);
    });
  }

}
