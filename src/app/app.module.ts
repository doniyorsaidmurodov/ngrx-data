import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PostsListComponent} from './posts/posts-list/posts-list.component';
import {SinglePostComponent} from './posts/single-post/single-post.component';
import {EditPostComponent} from './posts/edit-post/edit-post.component';
import {AddPostComponent} from './posts/add-post/add-post.component';
import {HomeComponent} from './home/home.component';
import {EntityDataModule, EntityDataService} from '@ngrx/data';
import {entityConfig} from './entity-metadata';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {HttpClientModule} from "@angular/common/http";
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../environments/environment';
import {PostsDataService} from "./services/posts-data.service";
import {PostsResolver} from "./services/posts.resolver";
import {ReactiveFormsModule} from "@angular/forms";

@NgModule({
  declarations: [
    AppComponent,
    PostsListComponent,
    SinglePostComponent,
    EditPostComponent,
    AddPostComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    EffectsModule.forRoot([]),
    EntityDataModule.forRoot(entityConfig),
    StoreModule.forRoot({}, {}),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    ReactiveFormsModule
  ],
  providers: [PostsDataService, PostsResolver],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(
    entityDataService: EntityDataService,
    PostsDataService: PostsDataService
  ) {
    entityDataService.registerService('Post', PostsDataService)
  }
}
