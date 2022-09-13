import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';
import {Post} from "./models/posts.model";

export const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: { //it's not depends on the success request
      optimisticUpdate: true,
      optimisticDelete: true
    },
    sortComparer: sortByName
  }
};

function sortByName(a: Post, b: Post): number {
  let comp = a.title.localeCompare(b.title);
  if (comp > 0) return -1;
  if (comp < 0) return 1;
  return comp;
}

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};
