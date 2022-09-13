import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {Post} from "../../models/posts.model";
import {PostService} from "../../services/post.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  formData: FormGroup;

  constructor(
    private postService: PostService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.formData = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    })
  }

  onAddPost() {
    if (this.formData.invalid) {
      return;
    }

    const post: Post = this.formData.value;

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
