import { EntityMetadataMap, EntityDataModuleConfig } from '@ngrx/data';

const entityMetadata: EntityMetadataMap = {
  Post: {
    entityDispatcherOptions: { //it's not depends on the success request
      optimisticUpdate: true,
      optimisticDelete: true
    }
  }
};

export const entityConfig: EntityDataModuleConfig = {
  entityMetadata,
};
