import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";
import {PostService} from "../../services/post.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  editPostForm: FormGroup;
  id: string;

  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit(): void {
    this.editPostForm = new FormGroup({
      title: new FormControl(null),
      description: new FormControl(null),
    });

    this.id = this.route.snapshot.params['id'];

    this.postService.entities$.subscribe(posts => {
      const post = posts.find(p => p.id === this.id);

      if (post) {
        this.editPostForm.patchValue({
          title: post.title,
          description: post.description
        });
      }
    });
  }

  onEditPost() {
    const postData = {
      id: this.id,
      ...this.editPostForm.value
    }

    console.log(postData)

    this.postService.update(postData);
    this.router.navigate(['/posts']).then();
  }
}
