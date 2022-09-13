import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../models/posts.model";
import {PostService} from "../post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  addPostForm: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.addPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    })
  }

  onAddPost() {
    if (this.addPostForm.invalid) {
      return;
    }

    const post: Post = this.addPostForm.value;

    const isEmpty = Object.values(post).some(val => {
      return val === null;
    });

    if (!isEmpty) {
      this.postService.add(post).subscribe(add => {
        this.router.navigate(['posts']).then();
      });
    } else {
      alert('Please fill form');
    }
  }
}
