import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AbortMultiPartInput = {
  uploadId: Scalars['String'];
  key: Scalars['String'];
};

export type AssignMediaGalleriesToTargetsResponse = {
  __typename?: 'AssignMediaGalleriesToTargetsResponse';
  success: Scalars['Boolean'];
  galleries?: Maybe<Array<MediaGallery>>;
};

export type AssignMediaToGalleryInput = {
  mediaId: Scalars['String'];
  order?: InputMaybe<Scalars['Int']>;
};

export type AssignMediasToCategoriesResponse = {
  __typename?: 'AssignMediasToCategoriesResponse';
  success: Scalars['Boolean'];
  medias?: Maybe<Array<NewMedia>>;
  categories?: Maybe<Array<MediaCategory>>;
};

export type AssignMediasToGalleriesResponse = {
  __typename?: 'AssignMediasToGalleriesResponse';
  success: Scalars['Boolean'];
  medias?: Maybe<Array<NewMedia>>;
  galleries?: Maybe<Array<MediaGallery>>;
};

export type AssignMediasToTagsResponse = {
  __typename?: 'AssignMediasToTagsResponse';
  success: Scalars['Boolean'];
  medias?: Maybe<Array<NewMedia>>;
  tags?: Maybe<Array<NewMediaTag>>;
};

export type CompleteMultiPartInput = {
  uploadId: Scalars['String'];
  key: Scalars['String'];
  parts: Array<MultiPartInput>;
};

export type CreateMediaCategoryInput = {
  name: Scalars['String'];
  isMenu?: InputMaybe<Scalars['Boolean']>;
  mediaIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateMediaGalleryInput = {
  categoryId: Scalars['String'];
  name: Scalars['String'];
  mediaIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateMediaTagInput = {
  name: Scalars['String'];
  mediaIds?: InputMaybe<Array<Scalars['String']>>;
};

export type CreateNewMediaInput = {
  originalFileName: Scalars['String'];
  key: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  size: Scalars['Int'];
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
};

export type CreateUserMediaInput = {
  originalFileName: Scalars['String'];
  key: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  size: Scalars['Int'];
  width?: InputMaybe<Scalars['Int']>;
  height?: InputMaybe<Scalars['Int']>;
};

export type CsvAssignMediaGalleryInput = {
  linkOnlyGalleries?: InputMaybe<Array<Scalars['String']>>;
  newGalleries?: InputMaybe<Array<Scalars['String']>>;
  renamedGalleries?: InputMaybe<Array<CsvAssignMediaGalleryRenameField>>;
};

export type CsvAssignMediaGalleryRenameField = {
  id?: InputMaybe<Scalars['String']>;
  newName?: InputMaybe<Scalars['String']>;
};

export type DeleteMediaInput = {
  key: Scalars['String'];
};

export enum GalleryAssignmentTypes {
  Amenity = 'AMENITY',
  Unit = 'UNIT',
  UnitModel = 'UNIT_MODEL',
  FloorPlan = 'FLOOR_PLAN',
  KeyPlan = 'KEY_PLAN',
  Component = 'COMPONENT',
  Presentation = 'PRESENTATION',
  PointOfInterest = 'POINT_OF_INTEREST',
  Elevation = 'ELEVATION',
  HomeModel = 'HOME_MODEL',
  Homesite = 'HOMESITE',
  Hotspot = 'HOTSPOT'
}

export type GalleryTarget = {
  __typename?: 'GalleryTarget';
  id: Scalars['ID'];
  type: GalleryAssignmentTypes;
  name: Scalars['String'];
};

export type GenericResponse = {
  __typename?: 'GenericResponse';
  success: Scalars['Boolean'];
  message?: Maybe<Scalars['String']>;
};

export type Media = {
  __typename?: 'Media';
  key: Scalars['String'];
  url: Scalars['String'];
  mediaType: Scalars['String'];
  tags?: Maybe<Array<Maybe<MediaTag>>>;
};

export type MediaUrlArgs = {
  h?: InputMaybe<Scalars['Int']>;
  w?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['Int']>;
};

export enum MediaAssetType {
  Image = 'IMAGE',
  Video = 'VIDEO',
  Document = 'DOCUMENT'
}

export type MediaCategory = Timestamps & {
  __typename?: 'MediaCategory';
  id: Scalars['ID'];
  propertyId: Scalars['String'];
  name: Scalars['String'];
  isMenu?: Maybe<Scalars['Boolean']>;
  thumbnail?: Maybe<NewMedia>;
  mediaIds: Array<Scalars['String']>;
  medias: Array<NewMedia>;
  galleries: Array<MediaGallery>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type MediaGallery = Timestamps & {
  __typename?: 'MediaGallery';
  id: Scalars['ID'];
  name: Scalars['String'];
  order?: Maybe<Scalars['Int']>;
  listOrder?: Maybe<Scalars['Int']>;
  thumbnail?: Maybe<NewMedia>;
  propertyId: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  medias: Array<NewMedia>;
  categoryId: Scalars['String'];
  category: MediaCategory;
  targetIds: Array<Scalars['String']>;
  targets: Array<GalleryTarget>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type MediaGalleryTargetIdsArgs = {
  type?: InputMaybe<GalleryAssignmentTypes>;
};

export type MediaGalleryTargetsArgs = {
  type?: InputMaybe<GalleryAssignmentTypes>;
};

export type MediaGalleryTargetInput = {
  targetId: Scalars['String'];
  componentId?: InputMaybe<Scalars['String']>;
  unitId?: InputMaybe<Scalars['String']>;
};

export type MediaTag = {
  __typename?: 'MediaTag';
  key: Scalars['String'];
  value: Scalars['String'];
};

export type MediaTagInput = {
  key: Scalars['String'];
  value: Scalars['String'];
};

export type MultiPartInput = {
  ETag: Scalars['String'];
  PartNumber: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  signPropertyMultiPartUpload?: Maybe<SignedMultiPartResponse>;
  signUserMultiPartUpload?: Maybe<SignedMultiPartResponse>;
  completeMultiPartUpload?: Maybe<GenericResponse>;
  abortMultiPartUpload?: Maybe<GenericResponse>;
  signPropertyUpload?: Maybe<SignMediaResponse>;
  signScreensaverUpload?: Maybe<SignMediaResponse>;
  signUserUpload?: Maybe<SignMediaResponse>;
  setTags?: Maybe<MediaTag>;
  deletePropertyMedia?: Maybe<Media>;
  deleteScreensaverMedia?: Maybe<Media>;
  createNewMedia?: Maybe<NewMedia>;
  updateNewMedia?: Maybe<NewMedia>;
  deleteUserMedia?: Maybe<UserMedia>;
  createUserMedia?: Maybe<UserMedia>;
  updateUserMedia?: Maybe<UserMedia>;
  updateManyNewMedia?: Maybe<Array<Maybe<NewMedia>>>;
  deleteNewMedia?: Maybe<NewMedia>;
  batchDeleteNewMedia: Array<Scalars['String']>;
  createMediaCategory?: Maybe<MediaCategory>;
  batchCreateMediaCategory?: Maybe<Array<MediaCategory>>;
  seedMediaCategories?: Maybe<Scalars['Boolean']>;
  updateMediaCategory?: Maybe<MediaCategory>;
  deleteMediaCategory?: Maybe<MediaCategory>;
  createMediaGallery?: Maybe<MediaGallery>;
  batchCreateMediaGallery?: Maybe<Array<MediaCategory>>;
  updateMediaGallery?: Maybe<MediaGallery>;
  updateManyMediaGallery?: Maybe<Array<Maybe<MediaGallery>>>;
  deleteMediaGallery?: Maybe<MediaGallery>;
  csvAssignMediaGallery?: Maybe<GenericResponse>;
  createMediaTag?: Maybe<NewMediaTag>;
  updateMediaTag?: Maybe<NewMediaTag>;
  deleteMediaTag?: Maybe<NewMediaTag>;
  assignMediasToCategories: AssignMediasToCategoriesResponse;
  unassignMediasToCategories: AssignMediasToCategoriesResponse;
  assignMediasToGalleries: AssignMediasToGalleriesResponse;
  unassignMediasToGalleries: AssignMediasToGalleriesResponse;
  assignMediasToTags: AssignMediasToTagsResponse;
  unassignMediasToTags: AssignMediasToTagsResponse;
  assignMediaGalleriesToTargets?: Maybe<AssignMediaGalleriesToTargetsResponse>;
  unassignMediaGalleriesToTargets?: Maybe<AssignMediaGalleriesToTargetsResponse>;
};

export type MutationSignPropertyMultiPartUploadArgs = {
  input: SignPropertyMultiPartUploadInput;
};

export type MutationSignUserMultiPartUploadArgs = {
  input: SignUserMultiPartUploadInput;
};

export type MutationCompleteMultiPartUploadArgs = {
  input: CompleteMultiPartInput;
};

export type MutationAbortMultiPartUploadArgs = {
  input: AbortMultiPartInput;
};

export type MutationSignPropertyUploadArgs = {
  input?: InputMaybe<SignPropertyUploadInput>;
};

export type MutationSignScreensaverUploadArgs = {
  input?: InputMaybe<SignScreensaverUploadInput>;
};

export type MutationSignUserUploadArgs = {
  input?: InputMaybe<SignUserUploadInput>;
};

export type MutationSetTagsArgs = {
  input: SetTagsInput;
};

export type MutationDeletePropertyMediaArgs = {
  input?: InputMaybe<DeleteMediaInput>;
};

export type MutationDeleteScreensaverMediaArgs = {
  input?: InputMaybe<DeleteMediaInput>;
};

export type MutationCreateNewMediaArgs = {
  propertyId: Scalars['String'];
  input: CreateNewMediaInput;
};

export type MutationUpdateNewMediaArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
  input: UpdateNewMediaInput;
};

export type MutationDeleteUserMediaArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationCreateUserMediaArgs = {
  userId: Scalars['String'];
  input: CreateUserMediaInput;
};

export type MutationUpdateUserMediaArgs = {
  userId: Scalars['String'];
  mediaId: Scalars['String'];
  input: UpdateUserMediaInput;
};

export type MutationUpdateManyNewMediaArgs = {
  propertyId: Scalars['String'];
  input: Array<UpdateManyNewMediaInput>;
};

export type MutationDeleteNewMediaArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationBatchDeleteNewMediaArgs = {
  propertyId: Scalars['String'];
  ids: Array<Scalars['String']>;
};

export type MutationCreateMediaCategoryArgs = {
  propertyId: Scalars['String'];
  input: CreateMediaCategoryInput;
};

export type MutationBatchCreateMediaCategoryArgs = {
  propertyId: Scalars['String'];
  input: Array<CreateMediaCategoryInput>;
};

export type MutationSeedMediaCategoriesArgs = {
  propertyId: Scalars['String'];
};

export type MutationUpdateMediaCategoryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
  input: UpdateMediaCategoryInput;
};

export type MutationDeleteMediaCategoryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationCreateMediaGalleryArgs = {
  propertyId: Scalars['String'];
  input: CreateMediaGalleryInput;
};

export type MutationBatchCreateMediaGalleryArgs = {
  propertyId: Scalars['String'];
  input: Array<CreateMediaGalleryInput>;
};

export type MutationUpdateMediaGalleryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
  input: UpdateMediaGalleryInput;
};

export type MutationUpdateManyMediaGalleryArgs = {
  propertyId: Scalars['String'];
  input: Array<InputMaybe<UpdateManyMediaGalleryInput>>;
};

export type MutationDeleteMediaGalleryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationCsvAssignMediaGalleryArgs = {
  propertyId: Scalars['String'];
  type: GalleryAssignmentTypes;
  target: MediaGalleryTargetInput;
  input: CsvAssignMediaGalleryInput;
};

export type MutationCreateMediaTagArgs = {
  propertyId: Scalars['String'];
  input: CreateMediaTagInput;
};

export type MutationUpdateMediaTagArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
  input: UpdateMediaTagInput;
};

export type MutationDeleteMediaTagArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationAssignMediasToCategoriesArgs = {
  propertyId: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  categoryIds: Array<Scalars['String']>;
};

export type MutationUnassignMediasToCategoriesArgs = {
  propertyId: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  categoryIds: Array<Scalars['String']>;
};

export type MutationAssignMediasToGalleriesArgs = {
  propertyId: Scalars['String'];
  medias: Array<AssignMediaToGalleryInput>;
  galleryIds: Array<Scalars['String']>;
};

export type MutationUnassignMediasToGalleriesArgs = {
  propertyId: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  galleryIds: Array<Scalars['String']>;
};

export type MutationAssignMediasToTagsArgs = {
  propertyId: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  tagIds: Array<Scalars['String']>;
};

export type MutationUnassignMediasToTagsArgs = {
  propertyId: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  tagIds: Array<Scalars['String']>;
};

export type MutationAssignMediaGalleriesToTargetsArgs = {
  propertyId: Scalars['String'];
  type: GalleryAssignmentTypes;
  galleryIds: Array<Scalars['String']>;
  targets: Array<MediaGalleryTargetInput>;
};

export type MutationUnassignMediaGalleriesToTargetsArgs = {
  propertyId: Scalars['String'];
  type: GalleryAssignmentTypes;
  galleryIds: Array<Scalars['String']>;
  targetIds: Array<Scalars['String']>;
};

export type NewMedia = Timestamps & {
  __typename?: 'NewMedia';
  id: Scalars['ID'];
  propertyId: Scalars['String'];
  originalFileName: Scalars['String'];
  key: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  showTitle?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  assetType: MediaAssetType;
  size: Scalars['Int'];
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  listOrder?: Maybe<Scalars['Int']>;
  tagIds: Array<Scalars['String']>;
  tags: Array<NewMediaTag>;
  categoryIds: Array<Scalars['String']>;
  categories: Array<MediaCategory>;
  galleryIds: Array<Scalars['String']>;
  galleries: Array<MediaGallery>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type NewMediaUrlArgs = {
  w?: InputMaybe<Scalars['Int']>;
  h?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['Int']>;
  thumbnail?: InputMaybe<Scalars['Boolean']>;
};

export type NewMediaTag = Timestamps & {
  __typename?: 'NewMediaTag';
  id: Scalars['ID'];
  propertyId: Scalars['String'];
  name: Scalars['String'];
  mediaIds: Array<Scalars['String']>;
  medias: Array<NewMedia>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type PaginatedMediaCategoriesResult = {
  __typename?: 'PaginatedMediaCategoriesResult';
  categories: Array<MediaCategory>;
  pagination: Pagination;
};

export type PaginatedMediaGalleriesResult = {
  __typename?: 'PaginatedMediaGalleriesResult';
  galleries: Array<MediaGallery>;
  pagination: Pagination;
};

export type PaginatedMediaResult = {
  __typename?: 'PaginatedMediaResult';
  medias: Array<NewMedia>;
  pagination: Pagination;
};

export type Pagination = {
  __typename?: 'Pagination';
  nextKey?: Maybe<Scalars['String']>;
};

export type PaginationInput = {
  startKey?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  listPropertyMedia?: Maybe<Array<Maybe<Media>>>;
  listUserMedia?: Maybe<Array<Maybe<Media>>>;
  listScreensaverMedia?: Maybe<Array<Maybe<Media>>>;
  userMedia?: Maybe<UserMedia>;
  userMedias: Array<UserMedia>;
  media?: Maybe<NewMedia>;
  medias: Array<NewMedia>;
  paginatedMedias: PaginatedMediaResult;
  mediaCategory?: Maybe<MediaCategory>;
  mediaCategories: Array<MediaCategory>;
  paginatedMediaGalleries: PaginatedMediaGalleriesResult;
  paginatedMediaCategories: PaginatedMediaCategoriesResult;
  mediaGallery?: Maybe<MediaGallery>;
  mediaGalleries: Array<MediaGallery>;
  mediaGalleriesByTarget: Array<MediaGallery>;
  mediaTag?: Maybe<NewMediaTag>;
  mediaTags: Array<NewMediaTag>;
};

export type QueryListPropertyMediaArgs = {
  propertyId: Scalars['String'];
};

export type QueryListScreensaverMediaArgs = {
  applicationId: Scalars['String'];
};

export type QueryUserMediaArgs = {
  userId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryUserMediasArgs = {
  userId: Scalars['String'];
};

export type QueryMediaArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryMediasArgs = {
  propertyId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MediaAssetType>;
};

export type QueryPaginatedMediasArgs = {
  propertyId: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<MediaAssetType>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryMediaCategoryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryMediaCategoriesArgs = {
  propertyId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type QueryPaginatedMediaGalleriesArgs = {
  propertyId: Scalars['String'];
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryPaginatedMediaCategoriesArgs = {
  propertyId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryMediaGalleryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryMediaGalleriesArgs = {
  propertyId: Scalars['String'];
  categoryId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type QueryMediaGalleriesByTargetArgs = {
  propertyId: Scalars['String'];
  targetId: Scalars['String'];
  type: GalleryAssignmentTypes;
};

export type QueryMediaTagArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryMediaTagsArgs = {
  propertyId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type SetTagsInput = {
  key: Scalars['String'];
  tags?: InputMaybe<Array<InputMaybe<MediaTagInput>>>;
};

export type SignMediaResponse = {
  __typename?: 'SignMediaResponse';
  key: Scalars['String'];
  mediaType: Scalars['String'];
  uploadUrl: Scalars['String'];
  url: Scalars['String'];
  path?: Maybe<Scalars['String']>;
};

export type SignPropertyMultiPartUploadInput = {
  propertyId: Scalars['String'];
  mediaType: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  fileSize: Scalars['Int'];
};

export type SignPropertyUploadInput = {
  propertyId: Scalars['String'];
  mediaType: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
};

export type SignScreensaverUploadInput = {
  applicationId: Scalars['String'];
  mediaType: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
};

export type SignUserMultiPartUploadInput = {
  userId: Scalars['String'];
  mediaType: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  fileSize: Scalars['Int'];
};

export type SignUserUploadInput = {
  mediaType: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
};

export type SignedMultiPartResponse = {
  __typename?: 'SignedMultiPartResponse';
  key: Scalars['String'];
  uploadUrls: Array<Scalars['String']>;
  uploadId: Scalars['String'];
};

export type Timestamps = {
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type UpdateManyMediaGalleryInput = {
  id: Scalars['String'];
  categoryId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
  listOrder?: InputMaybe<Scalars['Int']>;
};

export type UpdateManyNewMediaInput = {
  id: Scalars['String'];
  listOrder?: InputMaybe<Scalars['Int']>;
};

export type UpdateMediaCategoryInput = {
  name?: InputMaybe<Scalars['String']>;
  isMenu?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateMediaGalleryInput = {
  categoryId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  order?: InputMaybe<Scalars['Int']>;
};

export type UpdateMediaTagInput = {
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateNewMediaInput = {
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  showTitle?: InputMaybe<Scalars['Boolean']>;
};

export type UpdateUserMediaInput = {
  title?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
};

export type UserMedia = Timestamps & {
  __typename?: 'UserMedia';
  id: Scalars['ID'];
  userId: Scalars['String'];
  originalFileName: Scalars['String'];
  key: Scalars['String'];
  title: Scalars['String'];
  url: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  assetType: MediaAssetType;
  size: Scalars['Int'];
  width?: Maybe<Scalars['Int']>;
  height?: Maybe<Scalars['Int']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  deletedAt?: Maybe<Scalars['String']>;
};

export type UserMediaUrlArgs = {
  w?: InputMaybe<Scalars['Int']>;
  h?: InputMaybe<Scalars['Int']>;
  q?: InputMaybe<Scalars['Int']>;
  thumbnail?: InputMaybe<Scalars['Boolean']>;
};

export type GetGalleryByIdQueryVariables = Exact<{
  propertyId: Scalars['String'];
  id: Scalars['String'];
}>;

export type GetGalleryByIdQuery = {
  __typename?: 'Query';
  mediaGallery?: {
    __typename?: 'MediaGallery';
    medias: Array<{
      __typename?: 'NewMedia';
      id: string;
      title: string;
      showTitle?: boolean | null;
      url: string;
    }>;
  } | null;
};

export type ListPropertyCategoriesQueryVariables = Exact<{
  propertyId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
}>;

export type ListPropertyCategoriesQuery = {
  __typename?: 'Query';
  mediaCategories: Array<{
    __typename?: 'MediaCategory';
    id: string;
    name: string;
    medias: Array<{
      __typename?: 'NewMedia';
      id: string;
      title: string;
      showTitle?: boolean | null;
      url: string;
      key: string;
    }>;
  }>;
};

export type ListPropertyGalleriesQueryVariables = Exact<{
  propertyId: Scalars['String'];
}>;

export type ListPropertyGalleriesQuery = {
  __typename?: 'Query';
  mediaGalleries: Array<{
    __typename?: 'MediaGallery';
    id: string;
    name: string;
    category: { __typename?: 'MediaCategory'; name: string };
    medias: Array<{
      __typename?: 'NewMedia';
      id: string;
      title: string;
      showTitle?: boolean | null;
      url: string;
      key: string;
      description?: string | null;
      thumbnail: string;
      tags: Array<{ __typename?: 'NewMediaTag'; name: string }>;
    }>;
    componentTargets: Array<{
      __typename?: 'GalleryTarget';
      id: string;
      name: string;
      type: GalleryAssignmentTypes;
    }>;
    unitTargets: Array<{
      __typename?: 'GalleryTarget';
      id: string;
      name: string;
      type: GalleryAssignmentTypes;
    }>;
    unitModelTargets: Array<{
      __typename?: 'GalleryTarget';
      id: string;
      name: string;
      type: GalleryAssignmentTypes;
    }>;
    floorplanTargets: Array<{
      __typename?: 'GalleryTarget';
      id: string;
      name: string;
      type: GalleryAssignmentTypes;
    }>;
    keyplanTargets: Array<{
      __typename?: 'GalleryTarget';
      id: string;
      name: string;
      type: GalleryAssignmentTypes;
    }>;
    amenityTargets: Array<{
      __typename?: 'GalleryTarget';
      id: string;
      name: string;
      type: GalleryAssignmentTypes;
    }>;
  }>;
};

export const GetGalleryByIdDocument = gql`
  query GetGalleryById($propertyId: String!, $id: String!) {
    mediaGallery(propertyId: $propertyId, id: $id) {
      medias {
        id
        title
        showTitle
        url
      }
    }
  }
`;

/**
 * __useGetGalleryByIdQuery__
 *
 * To run a query within a React component, call `useGetGalleryByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetGalleryByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetGalleryByIdQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetGalleryByIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetGalleryByIdQuery,
    GetGalleryByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetGalleryByIdQuery, GetGalleryByIdQueryVariables>(
    GetGalleryByIdDocument,
    options
  );
}
export function useGetGalleryByIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetGalleryByIdQuery,
    GetGalleryByIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetGalleryByIdQuery, GetGalleryByIdQueryVariables>(
    GetGalleryByIdDocument,
    options
  );
}
export type GetGalleryByIdQueryHookResult = ReturnType<
  typeof useGetGalleryByIdQuery
>;
export type GetGalleryByIdLazyQueryHookResult = ReturnType<
  typeof useGetGalleryByIdLazyQuery
>;
export type GetGalleryByIdQueryResult = Apollo.QueryResult<
  GetGalleryByIdQuery,
  GetGalleryByIdQueryVariables
>;
export const ListPropertyCategoriesDocument = gql`
  query ListPropertyCategories($propertyId: String!, $name: String) {
    mediaCategories(propertyId: $propertyId, name: $name) {
      id
      name
      medias {
        id
        title
        showTitle
        url
        key
      }
    }
  }
`;

/**
 * __useListPropertyCategoriesQuery__
 *
 * To run a query within a React component, call `useListPropertyCategoriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPropertyCategoriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPropertyCategoriesQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useListPropertyCategoriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListPropertyCategoriesQuery,
    ListPropertyCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListPropertyCategoriesQuery,
    ListPropertyCategoriesQueryVariables
  >(ListPropertyCategoriesDocument, options);
}
export function useListPropertyCategoriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListPropertyCategoriesQuery,
    ListPropertyCategoriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListPropertyCategoriesQuery,
    ListPropertyCategoriesQueryVariables
  >(ListPropertyCategoriesDocument, options);
}
export type ListPropertyCategoriesQueryHookResult = ReturnType<
  typeof useListPropertyCategoriesQuery
>;
export type ListPropertyCategoriesLazyQueryHookResult = ReturnType<
  typeof useListPropertyCategoriesLazyQuery
>;
export type ListPropertyCategoriesQueryResult = Apollo.QueryResult<
  ListPropertyCategoriesQuery,
  ListPropertyCategoriesQueryVariables
>;
export const ListPropertyGalleriesDocument = gql`
  query ListPropertyGalleries($propertyId: String!) {
    mediaGalleries(propertyId: $propertyId) {
      id
      name
      category {
        name
      }
      medias {
        id
        title
        showTitle
        url
        thumbnail: url(thumbnail: true)
        key
        description
        tags {
          name
        }
      }
      componentTargets: targets(type: COMPONENT) {
        id
        name
        type
      }
      unitTargets: targets(type: UNIT) {
        id
        name
        type
      }
      unitModelTargets: targets(type: UNIT_MODEL) {
        id
        name
        type
      }
      floorplanTargets: targets(type: FLOOR_PLAN) {
        id
        name
        type
      }
      keyplanTargets: targets(type: KEY_PLAN) {
        id
        name
        type
      }
      amenityTargets: targets(type: AMENITY) {
        id
        name
        type
      }
    }
  }
`;

/**
 * __useListPropertyGalleriesQuery__
 *
 * To run a query within a React component, call `useListPropertyGalleriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListPropertyGalleriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListPropertyGalleriesQuery({
 *   variables: {
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useListPropertyGalleriesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListPropertyGalleriesQuery,
    ListPropertyGalleriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    ListPropertyGalleriesQuery,
    ListPropertyGalleriesQueryVariables
  >(ListPropertyGalleriesDocument, options);
}
export function useListPropertyGalleriesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListPropertyGalleriesQuery,
    ListPropertyGalleriesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    ListPropertyGalleriesQuery,
    ListPropertyGalleriesQueryVariables
  >(ListPropertyGalleriesDocument, options);
}
export type ListPropertyGalleriesQueryHookResult = ReturnType<
  typeof useListPropertyGalleriesQuery
>;
export type ListPropertyGalleriesLazyQueryHookResult = ReturnType<
  typeof useListPropertyGalleriesLazyQuery
>;
export type ListPropertyGalleriesQueryResult = Apollo.QueryResult<
  ListPropertyGalleriesQuery,
  ListPropertyGalleriesQueryVariables
>;
