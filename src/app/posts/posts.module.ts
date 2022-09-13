import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import {PostsListComponent} from "./posts-list/posts-list.component";
import {PostsResolver} from "./posts.resolver";
import {AddPostComponent} from "./add-post/add-post.component";
import {EditPostComponent} from "./edit-post/edit-post.component";
import {SinglePostComponent} from "./single-post/single-post.component";
import {ReactiveFormsModule} from "@angular/forms";
import {EntityDataService, EntityDefinitionService} from "@ngrx/data";
import {PostsDataService} from "./posts-data.service";
import {entityMetadata} from "../entity-metadata";

const routes: Routes = [
  {path: '', component: PostsListComponent, resolve: {posts: PostsResolver}},
  {path: 'add', component: AddPostComponent},
  {path: 'edit/:id', component: EditPostComponent, resolve: {posts: PostsResolver}},
  {path: 'details/:id', component: SinglePostComponent, resolve: {posts: PostsResolver}},
]

@NgModule({
  declarations: [
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  providers: [PostsResolver, PostsDataService]
})

export class PostsModule {
  constructor(
    eds: EntityDefinitionService,
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    eds.registerMetadataMap(entityMetadata);
    entityDataService.registerService('Post', PostsDataService);
  }
}
