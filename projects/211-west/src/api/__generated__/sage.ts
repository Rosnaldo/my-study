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
  BigInt: any;
  JSON: any;
};

export type AddClientUnitsViewedInput = {
  id: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  agentId: Scalars['String'];
  clientId: Scalars['String'];
};

export type Address = {
  __typename?: 'Address';
  addressLine1?: Maybe<Scalars['String']>;
  addressLine2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  countryCode?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  postalCode?: Maybe<Scalars['String']>;
  province?: Maybe<Scalars['String']>;
  region?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type Agent = {
  __typename?: 'Agent';
  id?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  applicationId: Scalars['String'];
  phoneNumber?: Maybe<Scalars['String']>;
  clients?: Maybe<Array<Maybe<Client>>>;
  favoriteListings?: Maybe<Array<Maybe<FavoriteListing>>>;
  favoriteProperties?: Maybe<Array<Maybe<FavoriteProperty>>>;
  savedSearches?: Maybe<Array<Maybe<SavedSearch>>>;
  savedUnits?: Maybe<Array<Maybe<SavedUnit>>>;
  lists?: Maybe<Array<Maybe<List>>>;
  comps?: Maybe<Array<Maybe<Comp>>>;
};

export type AgentInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
  applicationId: Scalars['String'];
  phoneNumber?: InputMaybe<Scalars['String']>;
  pin: Scalars['String'];
};

export type Amenity = {
  __typename?: 'Amenity';
  id?: Maybe<Scalars['String']>;
  propertyId: Scalars['String'];
  name: Scalars['String'];
  description?: Maybe<Scalars['String']>;
  galleryId?: Maybe<Scalars['String']>;
  gallery?: Maybe<Gallery>;
};

export type Application = {
  __typename?: 'Application';
  id: Scalars['String'];
  name: Scalars['String'];
  type: ApplicationType;
  orbitReelId?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<Scalars['String']>>>;
  featuredProperties?: Maybe<Array<Maybe<FeaturedProperty>>>;
  screensaver?: Maybe<Scalars['String']>;
  pages?: Maybe<Array<Maybe<Page>>>;
  additionalOrbitReels?: Maybe<Array<Maybe<OrbitReel>>>;
};

export enum ApplicationType {
  Sage = 'SAGE'
}

export type Broker = {
  __typename?: 'Broker';
  id?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
};

export type BrokerInput = {
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
};

export type Client = {
  __typename?: 'Client';
  id?: Maybe<Scalars['String']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  agentId?: Maybe<Scalars['String']>;
  applicationId: Scalars['String'];
  brokerId?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  company?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  firstVisit?: Maybe<Scalars['Boolean']>;
  hearAboutUs?: Maybe<Scalars['String']>;
  favoriteListings?: Maybe<Array<Maybe<FavoriteListing>>>;
  favoriteProperties?: Maybe<Array<Maybe<FavoriteProperty>>>;
  savedSearches?: Maybe<Array<Maybe<SavedSearch>>>;
  savedUnits?: Maybe<Array<Maybe<SavedUnit>>>;
  lists?: Maybe<Array<Maybe<List>>>;
  comps?: Maybe<Array<Maybe<Comp>>>;
  customAttributes?: Maybe<Scalars['JSON']>;
};

export type ClientInput = {
  firstName?: InputMaybe<Scalars['String']>;
  lastName?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  brokerId?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  firstVisit?: InputMaybe<Scalars['Boolean']>;
  hearAboutUs?: InputMaybe<Scalars['String']>;
  originalAgentId?: InputMaybe<Scalars['String']>;
  customAttributes?: InputMaybe<Scalars['JSON']>;
};

export type ClientUnitsViewed = {
  __typename?: 'ClientUnitsViewed';
  id: Scalars['String'];
  applicationId: Scalars['String'];
  clientId: Scalars['String'];
  agentId: Scalars['String'];
  units?: Maybe<Array<Maybe<UnitsViewed>>>;
};

export type Comp = {
  __typename?: 'Comp';
  id: Scalars['String'];
  userId: Scalars['String'];
  applicationId: Scalars['String'];
  name: Scalars['String'];
  listings?: Maybe<Array<Maybe<Listing>>>;
  subjectListingHash?: Maybe<ListingHash>;
  listingHashes?: Maybe<Array<Maybe<ListingHash>>>;
  createdAt?: Maybe<Scalars['String']>;
};

export type CompInput = {
  userId: Scalars['String'];
  applicationId: Scalars['String'];
  name: Scalars['String'];
  subjectListingHash: ListingHashInput;
  listingHashes: Array<ListingHashInput>;
};

export type Component = {
  __typename?: 'Component';
  id?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  propertyId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  builtOn?: Maybe<Scalars['String']>;
  salesStatus?: Maybe<Scalars['String']>;
  constructionStatus?: Maybe<ConstructionStatusType>;
  address?: Maybe<Address>;
  geoLocation?: Maybe<GeoLocation>;
  orbitReels?: Maybe<Array<Maybe<OrbitReel>>>;
  amenityIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  amenities?: Maybe<Array<Maybe<Amenity>>>;
  pointsOfInterestCollectionIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  pointsOfInterestCollections?: Maybe<Array<Maybe<PointsOfInterestCollection>>>;
  controlCategoryIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  controlCategories?: Maybe<Array<Maybe<ControlCategory>>>;
  galleries?: Maybe<Array<Maybe<GalleryConnection>>>;
  keyPlans?: Maybe<Array<Maybe<KeyPlan>>>;
  floors?: Maybe<Array<Maybe<Floor>>>;
  unitModels?: Maybe<Array<Maybe<UnitModel>>>;
  units?: Maybe<Array<Maybe<Unit>>>;
  sage?: Maybe<Array<Maybe<SageComponentAttributes>>>;
  propertyFeatures?: Maybe<Array<Maybe<Scalars['String']>>>;
  propertyServices?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type ComponentLogic = {
  __typename?: 'ComponentLogic';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  steps?: Maybe<Array<Maybe<LogicStep>>>;
  uiComponentId: Scalars['String'];
  children: Array<Scalars['String']>;
};

export type ConnectDeviceInput = {
  id: Scalars['String'];
  applicationId: Scalars['String'];
  connectionId: Scalars['String'];
};

export enum ConnectionProtocol {
  Tcp = 'TCP',
  Udp = 'UDP',
  Osc = 'OSC'
}

export enum ConstructionStatusType {
  Planning = 'PLANNING',
  PrePlanning = 'PRE_PLANNING',
  Approved = 'APPROVED',
  Built = 'BUILT',
  UnderConstruction = 'UNDER_CONSTRUCTION',
  Renovated = 'RENOVATED'
}

export type ControlCategory = {
  __typename?: 'ControlCategory';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  propertyId?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  enableCommand?: Maybe<Scalars['String']>;
  disableCommand?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type CreateBrokerInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  phone?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
};

export type CreateClientInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  brokerId?: InputMaybe<Scalars['String']>;
  sendEmail: Scalars['Boolean'];
  phone?: InputMaybe<Scalars['String']>;
  company?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
  city?: InputMaybe<Scalars['String']>;
  country?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  firstVisit?: InputMaybe<Scalars['Boolean']>;
  hearAboutUs?: InputMaybe<Scalars['String']>;
  customAttributes?: InputMaybe<Scalars['JSON']>;
};

export type CreateClientUnitsViewedInput = {
  applicationId: Scalars['String'];
  clientId: Scalars['String'];
  agentId: Scalars['String'];
  units?: InputMaybe<Array<InputMaybe<UnitViewedInput>>>;
};

export type CustomAttribute = {
  __typename?: 'CustomAttribute';
  name?: Maybe<Scalars['String']>;
  displayName?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
  attributes?: Maybe<Array<Maybe<CustomAttribute>>>;
};

export type DefaultResponse = {
  __typename?: 'DefaultResponse';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type DeleteManySavedHomesiteInput = {
  id: Scalars['String'];
};

export type DeleteManyUnit = {
  userId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  id: Scalars['String'];
};

export type DeleteManyUnitInput = {
  applicationId: Scalars['String'];
  units?: InputMaybe<Array<DeleteManyUnit>>;
};

export type DeleteSavedUnitInput = {
  id: Scalars['String'];
  userId: Scalars['String'];
  unitId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
};

export type DeletedListing = {
  __typename?: 'DeletedListing';
  applicationId: Scalars['String'];
  listingId: Scalars['String'];
  unitId: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
  createdAt: Scalars['String'];
};

export type Device = {
  __typename?: 'Device';
  id: Scalars['String'];
  name: Scalars['String'];
  applicationId: Scalars['String'];
  connectionId?: Maybe<Scalars['String']>;
  webSocketServerUrl?: Maybe<Scalars['String']>;
  aspectRatio?: Maybe<Scalars['String']>;
};

export type DeviceInput = {
  name: Scalars['String'];
  applicationId: Scalars['String'];
  webSocketServerUrl: Scalars['String'];
  aspectRatio: Scalars['String'];
  connectionId?: InputMaybe<Scalars['String']>;
};

export enum DeviceType {
  Companion = 'COMPANION',
  PhysicalModel = 'PHYSICAL_MODEL'
}

export type DisconnectDeviceInput = {
  id: Scalars['String'];
  applicationId: Scalars['String'];
};

export type Elevation = {
  __typename?: 'Elevation';
  id: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  name: Scalars['String'];
  mediaUrl?: Maybe<Scalars['String']>;
  mediaId?: Maybe<Scalars['String']>;
  price: Scalars['Float'];
  sageAttributes?: Maybe<Array<Maybe<SageComponentAttributes>>>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type EmailAttachmentInput = {
  content: Scalars['String'];
  filename: Scalars['String'];
  type: Scalars['String'];
  disposition?: InputMaybe<Scalars['String']>;
};

export type FavoriteListing = {
  __typename?: 'FavoriteListing';
  userId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  listingId: Scalars['String'];
  listing?: Maybe<Listing>;
  applicationId: Scalars['String'];
};

export type FavoriteListingInput = {
  userId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  listingId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type FavoriteProperty = {
  __typename?: 'FavoriteProperty';
  userId: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
  property?: Maybe<Property>;
};

export type FavoritePropertyInput = {
  userId: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type FeaturedProperty = {
  __typename?: 'FeaturedProperty';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  orbitReelName?: Maybe<Scalars['String']>;
};

export type Floor = {
  __typename?: 'Floor';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  keyPlanId?: Maybe<Scalars['String']>;
  keyPlan?: Maybe<KeyPlan>;
};

export type FloorPlan = {
  __typename?: 'FloorPlan';
  garages?: Maybe<Scalars['Int']>;
  floors?: Maybe<Scalars['Int']>;
};

export type Gallery = {
  __typename?: 'Gallery';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  media?: Maybe<Array<Maybe<Media>>>;
  propertyId: Scalars['String'];
};

export type GalleryConnection = {
  __typename?: 'GalleryConnection';
  createdAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
  galleries?: Maybe<Array<Maybe<Gallery>>>;
  galleryIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  target?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type GenericMutationResponse = {
  __typename?: 'GenericMutationResponse';
  success: Scalars['Boolean'];
  message: Scalars['String'];
};

export type GeoJson = {
  __typename?: 'GeoJSON';
  type?: Maybe<Scalars['String']>;
  features?: Maybe<Array<Maybe<GeoJsonFeature>>>;
};

export type GeoJsonFeature = {
  __typename?: 'GeoJSONFeature';
  type?: Maybe<Scalars['String']>;
  geometry?: Maybe<Geometry>;
};

export type GeoLocation = {
  __typename?: 'GeoLocation';
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type Geometry = {
  __typename?: 'Geometry';
  type?: Maybe<Scalars['String']>;
  coordinates?: Maybe<Array<Maybe<Array<Maybe<Scalars['Float']>>>>>;
};

export type HomeFloor = {
  __typename?: 'HomeFloor';
  id: Scalars['String'];
  name: Scalars['String'];
  mediaUrl?: Maybe<Scalars['String']>;
  mediaId?: Maybe<Scalars['String']>;
  floorNumber: Scalars['Int'];
};

export type HomeFloorInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  mediaUrl?: InputMaybe<Scalars['String']>;
  floorNumber: Scalars['Int'];
};

export type HomeModel = {
  __typename?: 'HomeModel';
  id: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  name: Scalars['String'];
  bedrooms: Scalars['Int'];
  halfBedrooms?: Maybe<Scalars['Int']>;
  bathrooms: Scalars['Int'];
  halfBathrooms?: Maybe<Scalars['Int']>;
  area: Scalars['Int'];
  garages: Scalars['Int'];
  price?: Maybe<Scalars['Float']>;
  sageAttributes?: Maybe<Array<Maybe<SageComponentAttributes>>>;
  elevationIds?: Maybe<Array<Scalars['String']>>;
  elevations?: Maybe<Array<Elevation>>;
  homeFloors?: Maybe<Array<HomeFloor>>;
  virtualTourURL?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type Homesite = {
  __typename?: 'Homesite';
  id: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  address?: Maybe<Address>;
  name: Scalars['String'];
  size: Scalars['Int'];
  swing?: Maybe<Scalars['String']>;
  deliveryDate?: Maybe<Scalars['String']>;
  releaseDate?: Maybe<Scalars['String']>;
  actualStartDate?: Maybe<Scalars['String']>;
  estimatedCeoDate?: Maybe<Scalars['String']>;
  actualCompletionDate?: Maybe<Scalars['String']>;
  projectStartDate?: Maybe<Scalars['String']>;
  constructionStage?: Maybe<Scalars['String']>;
  status: HomesiteStatus;
  basePrice?: Maybe<Scalars['Float']>;
  premiumPrice?: Maybe<Scalars['Float']>;
  finalPrice?: Maybe<Scalars['Float']>;
  selected?: Maybe<HomesiteSelectedOptions>;
  mediaUrl?: Maybe<Scalars['String']>;
  mediaId?: Maybe<Scalars['String']>;
  sageAttributes?: Maybe<Array<Maybe<SageComponentAttributes>>>;
  homeModelIds?: Maybe<Array<Scalars['String']>>;
  homeModels?: Maybe<Array<HomeModel>>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type HomesiteSelectedOptions = {
  __typename?: 'HomesiteSelectedOptions';
  homeModelId?: Maybe<Scalars['String']>;
  elevationId?: Maybe<Scalars['String']>;
};

export type HomesiteSelectedOptionsInput = {
  homeModelId?: InputMaybe<Scalars['String']>;
  elevationId?: InputMaybe<Scalars['String']>;
};

export enum HomesiteStatus {
  AvailablePlanned = 'AVAILABLE_PLANNED',
  AvailableUnplanned = 'AVAILABLE_UNPLANNED',
  Sold = 'SOLD',
  Reserved = 'RESERVED',
  Closed = 'CLOSED'
}

export type Hotspot = {
  __typename?: 'Hotspot';
  id: Scalars['String'];
  name: Scalars['String'];
  mediaId?: Maybe<Scalars['String']>;
  towerId?: Maybe<Scalars['String']>;
  type: HotspotType;
  map?: Maybe<Array<HotspotMap>>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type HotspotMap = {
  __typename?: 'HotspotMap';
  name: Scalars['String'];
  category?: Maybe<Scalars['String']>;
  descriptionPopUp?: Maybe<Scalars['String']>;
  tag?: Maybe<Scalars['String']>;
  x: Scalars['Float'];
  y: Scalars['Float'];
  width?: Maybe<Scalars['Float']>;
  height?: Maybe<Scalars['Float']>;
};

export enum HotspotType {
  Poi = 'POI',
  Area = 'AREA'
}

export enum InventoryType {
  Developer = 'DEVELOPER',
  Resale = 'RESALE'
}

export type KeyPlan = {
  __typename?: 'KeyPlan';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  media?: Maybe<Scalars['String']>;
  minimap?: Maybe<KeyPlanMinimap>;
};

export type KeyPlanMinimap = {
  __typename?: 'KeyPlanMinimap';
  svgUrl?: Maybe<Scalars['String']>;
  unitModelGroups?: Maybe<Array<Maybe<MinimapGroup>>>;
  unitGroups?: Maybe<Array<Maybe<MinimapGroup>>>;
};

export type List = {
  __typename?: 'List';
  id: Scalars['String'];
  userId: Scalars['String'];
  name: Scalars['String'];
  applicationId: Scalars['String'];
  listings?: Maybe<Array<Maybe<Listing>>>;
  listingHashes?: Maybe<Array<Maybe<ListingHash>>>;
  createdAt?: Maybe<Scalars['String']>;
};

export type ListInput = {
  userId: Scalars['String'];
  name: Scalars['String'];
  applicationId: Scalars['String'];
  listingHashes: Array<ListingHashInput>;
};

export type ListViews360Input = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  id?: Maybe<Scalars['String']>;
  neighborhood?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  type: InventoryType;
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  listingDate?: Maybe<Scalars['String']>;
  closingDate?: Maybe<Scalars['String']>;
  listPrice?: Maybe<Scalars['Float']>;
  status: ListingStatusType;
  hidden?: Maybe<Scalars['Boolean']>;
  address?: Maybe<Address>;
  geoLocation?: Maybe<GeoLocation>;
  privateRemarks?: Maybe<Scalars['String']>;
  virtualTourURL?: Maybe<Scalars['String']>;
  amenityIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  amenities?: Maybe<Array<Maybe<Amenity>>>;
  floorPlanGalleryId?: Maybe<Scalars['String']>;
  galleries?: Maybe<Array<Maybe<GalleryConnection>>>;
  taxId?: Maybe<Scalars['String']>;
  schools?: Maybe<Array<Maybe<Scalars['String']>>>;
  parking?: Maybe<Array<Maybe<Scalars['String']>>>;
  fees?: Maybe<Array<Maybe<ListingFee>>>;
  taxes?: Maybe<Array<Maybe<ListingTax>>>;
  listingAgents?: Maybe<Array<Maybe<ListingAgent>>>;
  sage?: Maybe<Array<Maybe<SageListingAttributes>>>;
  unit?: Maybe<Unit>;
  component?: Maybe<Component>;
  property?: Maybe<Property>;
  isOpenHouse?: Maybe<Scalars['Boolean']>;
  renovationDate?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  propertyName?: Maybe<Scalars['String']>;
  propertyImage?: Maybe<Scalars['String']>;
  propertyType?: Maybe<PropertyType>;
  propertySubType?: Maybe<Scalars['String']>;
  componentName?: Maybe<Scalars['String']>;
  componentBuiltOn?: Maybe<Scalars['String']>;
  componentSalesStatus?: Maybe<Scalars['String']>;
  unitName?: Maybe<Scalars['String']>;
  unitModelName?: Maybe<Scalars['String']>;
  unitModelBedrooms?: Maybe<Scalars['Int']>;
  unitModelBathrooms?: Maybe<Scalars['Int']>;
  unitModelHalfBathrooms?: Maybe<Scalars['Int']>;
  unitModelHalfBedrooms?: Maybe<Scalars['Int']>;
  unitModelInteriorArea?: Maybe<Scalars['Int']>;
  unitModelExteriorArea?: Maybe<Scalars['BigInt']>;
  hasVideo?: Maybe<Scalars['Boolean']>;
  hasOrbitReel?: Maybe<Scalars['Boolean']>;
  has3dTour?: Maybe<Scalars['Boolean']>;
  hoaPrice?: Maybe<Scalars['Int']>;
  numberOfParkingSpaces?: Maybe<Scalars['Int']>;
  numberOfGarageStalls?: Maybe<Scalars['Int']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  mlsNumber?: Maybe<Scalars['String']>;
  furnished?: Maybe<Scalars['String']>;
};

export type ListingAgent = {
  __typename?: 'ListingAgent';
  agentId?: Maybe<Scalars['String']>;
  isPrimary?: Maybe<Scalars['Boolean']>;
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};

export type ListingFee = {
  __typename?: 'ListingFee';
  isMandatory?: Maybe<Scalars['Boolean']>;
  name?: Maybe<Scalars['String']>;
  amount?: Maybe<Scalars['Int']>;
  schedule?: Maybe<ScheduleType>;
};

export type ListingHash = {
  __typename?: 'ListingHash';
  listingId: Scalars['String'];
  unitId: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
};

export type ListingHashInput = {
  listingId: Scalars['String'];
  unitId: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
};

export type ListingSelector = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  id: Scalars['String'];
};

export enum ListingStatusType {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE',
  Preview = 'PREVIEW',
  Sold = 'SOLD',
  Pending = 'PENDING'
}

export type ListingTax = {
  __typename?: 'ListingTax';
  amount?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['String']>;
  salePrice?: Maybe<Scalars['Int']>;
};

export type LogicStep = {
  __typename?: 'LogicStep';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  type: LogicStepType;
  config: LogicStepConfig;
  children: Array<Scalars['String']>;
  uiComponentId: Scalars['String'];
  componentLogicId: Scalars['String'];
};

export type LogicStepConfig = {
  __typename?: 'LogicStepConfig';
  CONDITION?: Maybe<LogicStepConfigCondition>;
  FOR_EACH?: Maybe<LogicStepConfigForEach>;
  ACTION?: Maybe<LogicStepConfigAction>;
};

export type LogicStepConfigAction = {
  __typename?: 'LogicStepConfigAction';
  type: LogicStepConfigActionType;
  data: LogicStepConfigActionData;
};

export type LogicStepConfigActionData = {
  __typename?: 'LogicStepConfigActionData';
  OPEN_PAGE?: Maybe<LogicStepConfigActionDataOpenPage>;
  SEND_COMMAND?: Maybe<LogicStepConfigActionDataSendCommand>;
  DISPLAY_MEDIA?: Maybe<LogicStepConfigActionDataDisplayMedia>;
  CLEAR_SCREEN?: Maybe<LogicStepConfigActionDataClearScreen>;
  REMOVE_LAST_SCREEN_DATA?: Maybe<LogicStepConfigActionDataRemoveLastScreenData>;
};

export type LogicStepConfigActionDataClearScreen = {
  __typename?: 'LogicStepConfigActionDataClearScreen';
  screenIds: Array<Scalars['String']>;
};

export type LogicStepConfigActionDataDisplayMedia = {
  __typename?: 'LogicStepConfigActionDataDisplayMedia';
  media?: Maybe<MediaReference>;
  galleryPosition?: Maybe<MediaGalleryPosition>;
  screenIds: Array<Scalars['String']>;
};

export type LogicStepConfigActionDataOpenPage = {
  __typename?: 'LogicStepConfigActionDataOpenPage';
  page: Scalars['String'];
  screenIds: Array<Scalars['String']>;
};

export type LogicStepConfigActionDataRemoveLastScreenData = {
  __typename?: 'LogicStepConfigActionDataRemoveLastScreenData';
  screenIds: Array<Scalars['String']>;
};

export type LogicStepConfigActionDataSendCommand = {
  __typename?: 'LogicStepConfigActionDataSendCommand';
  command: Scalars['String'];
  deviceId: Scalars['String'];
};

export enum LogicStepConfigActionType {
  OpenPage = 'OPEN_PAGE',
  SendCommand = 'SEND_COMMAND',
  DisplayMedia = 'DISPLAY_MEDIA',
  ClearScreen = 'CLEAR_SCREEN',
  RemoveLastScreenData = 'REMOVE_LAST_SCREEN_DATA'
}

export type LogicStepConfigCondition = {
  __typename?: 'LogicStepConfigCondition';
  uiComponentId: Scalars['String'];
  state: Scalars['String'];
};

export type LogicStepConfigForEach = {
  __typename?: 'LogicStepConfigForEach';
  uiComponentId: Scalars['String'];
  state: Scalars['String'];
};

export enum LogicStepType {
  Condition = 'CONDITION',
  ForEach = 'FOR_EACH',
  Action = 'ACTION'
}

export type LoginError = {
  __typename?: 'LoginError';
  error?: Maybe<Scalars['String']>;
  message?: Maybe<Scalars['String']>;
};

export type LoginResponseUnion = LoginSuccess | LoginError;

export type LoginSuccess = {
  __typename?: 'LoginSuccess';
  token?: Maybe<Scalars['String']>;
};

export type Media = {
  __typename?: 'Media';
  media?: Maybe<Scalars['String']>;
  isFeatured?: Maybe<Scalars['Boolean']>;
  tags?: Maybe<Array<Maybe<Scalars['String']>>>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  thumbnail?: Maybe<Scalars['String']>;
};

export enum MediaGalleryPosition {
  Current = 'CURRENT',
  Previous = 'PREVIOUS',
  Next = 'NEXT'
}

export type MediaPresentationLogic = {
  __typename?: 'MediaPresentationLogic';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  mediaId: Scalars['String'];
  deviceId?: Maybe<Scalars['String']>;
  stationId?: Maybe<Scalars['String']>;
  device?: Maybe<StationDevice>;
  horizontalScreens: Scalars['Int'];
  verticalScreens: Scalars['Int'];
};

export type MediaReference = {
  __typename?: 'MediaReference';
  mediaId: Scalars['String'];
  mediaPropertyId: Scalars['String'];
};

export type MinimapGroup = {
  __typename?: 'MinimapGroup';
  groupId?: Maybe<Scalars['String']>;
  externalIds?: Maybe<Array<Maybe<Scalars['String']>>>;
};

export type Mutation = {
  __typename?: 'Mutation';
  updateAgentImage?: Maybe<Agent>;
  loginWithPin?: Maybe<LoginResponseUnion>;
  createAgent?: Maybe<Agent>;
  updateAgent?: Maybe<Agent>;
  updateAgentPin?: Maybe<UpdateAgentPinUnion>;
  createClient?: Maybe<Client>;
  updateClient?: Maybe<Client>;
  deleteClient?: Maybe<Client>;
  createBroker?: Maybe<Broker>;
  updateBroker?: Maybe<Broker>;
  deleteBroker?: Maybe<Broker>;
  createDevice?: Maybe<Device>;
  connectDevice?: Maybe<Device>;
  disconnectDevice?: Maybe<Device>;
  resendPin?: Maybe<GenericMutationResponse>;
  shareListings?: Maybe<GenericMutationResponse>;
  shareListingsPdfs?: Maybe<GenericMutationResponse>;
  favoriteAgentListing?: Maybe<FavoriteListing>;
  unFavoriteAgentListing?: Maybe<FavoriteListing>;
  favoriteClientListing?: Maybe<FavoriteListing>;
  unFavoriteClientListing?: Maybe<FavoriteListing>;
  favoriteAgentProperty?: Maybe<FavoriteProperty>;
  unFavoriteAgentProperty?: Maybe<FavoriteProperty>;
  favoriteClientProperty?: Maybe<FavoriteProperty>;
  unFavoriteClientProperty?: Maybe<FavoriteProperty>;
  sendEmail?: Maybe<SendEmailResponse>;
  saveSearch?: Maybe<SavedSearch>;
  deleteSavedSearch?: Maybe<SavedSearch>;
  savedUnit?: Maybe<SavedUnit>;
  savedManyUnit?: Maybe<Array<Maybe<SavedUnit>>>;
  deleteSavedUnit?: Maybe<SavedUnit>;
  deleteManySavedUnit?: Maybe<Array<Maybe<SavedUnit>>>;
  batchDeleteSavedUnit?: Maybe<Array<Maybe<SavedUnit>>>;
  createList?: Maybe<List>;
  updateList?: Maybe<List>;
  deleteList?: Maybe<List>;
  createComp?: Maybe<Comp>;
  updateComp?: Maybe<Comp>;
  deleteComp?: Maybe<Comp>;
  signUserUpload?: Maybe<SignMediaResponse>;
  createClientUnitsViewed?: Maybe<ClientUnitsViewed>;
  addClientViewToUnit?: Maybe<ClientUnitsViewed>;
  sendShareUnitEmail?: Maybe<SendEmailResponse>;
  savedHomesite?: Maybe<SavedHomesite>;
  updateSavedHomesite?: Maybe<SavedHomesite>;
  deleteSavedHomesite?: Maybe<Scalars['Boolean']>;
  updatedManySavedHomesite?: Maybe<Array<SavedHomesite>>;
  deleteManySavedHomesite?: Maybe<Scalars['Boolean']>;
  updateUnit?: Maybe<DefaultResponse>;
};

export type MutationUpdateAgentImageArgs = {
  input: UpdateAgentImage;
};

export type MutationLoginWithPinArgs = {
  applicationId: Scalars['String'];
  userId: Scalars['String'];
  pin: Scalars['String'];
};

export type MutationCreateAgentArgs = {
  input: AgentInput;
};

export type MutationUpdateAgentArgs = {
  id: Scalars['String'];
  input: AgentInput;
};

export type MutationUpdateAgentPinArgs = {
  id: Scalars['String'];
  input: UpdateAgentPin;
};

export type MutationCreateClientArgs = {
  input: CreateClientInput;
};

export type MutationUpdateClientArgs = {
  id: Scalars['String'];
  input: ClientInput;
};

export type MutationDeleteClientArgs = {
  id: Scalars['String'];
  agentId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type MutationCreateBrokerArgs = {
  input: CreateBrokerInput;
};

export type MutationUpdateBrokerArgs = {
  id: Scalars['String'];
  input: BrokerInput;
};

export type MutationDeleteBrokerArgs = {
  id: Scalars['String'];
  clientId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type MutationCreateDeviceArgs = {
  input: DeviceInput;
};

export type MutationConnectDeviceArgs = {
  input: ConnectDeviceInput;
};

export type MutationDisconnectDeviceArgs = {
  input: DisconnectDeviceInput;
};

export type MutationResendPinArgs = {
  applicationId: Scalars['String'];
  email: Scalars['String'];
};

export type MutationShareListingsArgs = {
  applicationId: Scalars['String'];
  listings: Array<ListingSelector>;
  to: Scalars['String'];
  domain: Scalars['String'];
};

export type MutationShareListingsPdfsArgs = {
  applicationId: Scalars['String'];
  listings: Array<ListingSelector>;
  to: Scalars['String'];
  pixel?: InputMaybe<Scalars['String']>;
};

export type MutationFavoriteAgentListingArgs = {
  input?: InputMaybe<FavoriteListingInput>;
};

export type MutationUnFavoriteAgentListingArgs = {
  input?: InputMaybe<FavoriteListingInput>;
};

export type MutationFavoriteClientListingArgs = {
  input?: InputMaybe<FavoriteListingInput>;
};

export type MutationUnFavoriteClientListingArgs = {
  input?: InputMaybe<FavoriteListingInput>;
};

export type MutationFavoriteAgentPropertyArgs = {
  input?: InputMaybe<FavoritePropertyInput>;
};

export type MutationUnFavoriteAgentPropertyArgs = {
  input?: InputMaybe<FavoritePropertyInput>;
};

export type MutationFavoriteClientPropertyArgs = {
  input?: InputMaybe<FavoritePropertyInput>;
};

export type MutationUnFavoriteClientPropertyArgs = {
  input?: InputMaybe<FavoritePropertyInput>;
};

export type MutationSendEmailArgs = {
  input?: InputMaybe<SendEmailInput>;
};

export type MutationSaveSearchArgs = {
  input?: InputMaybe<SavedSearchInput>;
};

export type MutationDeleteSavedSearchArgs = {
  applicationId: Scalars['String'];
  userId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationSavedUnitArgs = {
  input?: InputMaybe<SavedUnitInput>;
};

export type MutationSavedManyUnitArgs = {
  input?: InputMaybe<SavedManyUnitInput>;
};

export type MutationDeleteSavedUnitArgs = {
  applicationId: Scalars['String'];
  input: DeleteSavedUnitInput;
};

export type MutationDeleteManySavedUnitArgs = {
  input?: InputMaybe<DeleteManyUnitInput>;
};

export type MutationBatchDeleteSavedUnitArgs = {
  applicationId: Scalars['String'];
  input: Array<DeleteSavedUnitInput>;
};

export type MutationCreateListArgs = {
  input: ListInput;
};

export type MutationUpdateListArgs = {
  id: Scalars['String'];
  input: ListInput;
};

export type MutationDeleteListArgs = {
  id: Scalars['String'];
  userId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type MutationCreateCompArgs = {
  input: CompInput;
};

export type MutationUpdateCompArgs = {
  id: Scalars['String'];
  input: CompInput;
};

export type MutationDeleteCompArgs = {
  id: Scalars['String'];
  userId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type MutationSignUserUploadArgs = {
  input: SignUserUploadInput;
};

export type MutationCreateClientUnitsViewedArgs = {
  input: CreateClientUnitsViewedInput;
};

export type MutationAddClientViewToUnitArgs = {
  input: AddClientUnitsViewedInput;
};

export type MutationSendShareUnitEmailArgs = {
  applicationId: Scalars['String'];
  input: SendShareUnitEmailInput;
};

export type MutationSavedHomesiteArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  input: SavedHomesiteInput;
};

export type MutationUpdateSavedHomesiteArgs = {
  applicationId: Scalars['String'];
  id: Scalars['String'];
  input: UpdateSavedHomesiteInput;
};

export type MutationDeleteSavedHomesiteArgs = {
  applicationId: Scalars['String'];
  id: Scalars['String'];
};

export type MutationUpdatedManySavedHomesiteArgs = {
  applicationId: Scalars['String'];
  input: Array<UpdateManySavedHomesiteInput>;
};

export type MutationDeleteManySavedHomesiteArgs = {
  applicationId: Scalars['String'];
  input: Array<DeleteManySavedHomesiteInput>;
};

export type MutationUpdateUnitArgs = {
  input: UpdateUnitInput;
};

export type OrbitReel = {
  __typename?: 'OrbitReel';
  id?: Maybe<Scalars['String']>;
  label?: Maybe<Scalars['String']>;
  colorMap?: Maybe<Array<Maybe<OrbitReelHighlightColor>>>;
};

export type OrbitReelHighlightColor = {
  __typename?: 'OrbitReelHighlightColor';
  color: Scalars['String'];
  label?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  currentUnit?: Maybe<Scalars['Boolean']>;
};

export type Page = {
  __typename?: 'Page';
  name: Scalars['String'];
  shortName?: Maybe<Scalars['String']>;
  path: Scalars['String'];
  keywords: Array<Scalars['String']>;
  thumbnail?: Maybe<PageThumbnail>;
  isMainMenuOption: Scalars['Boolean'];
  isIpadPage: Scalars['Boolean'];
  isWebPage: Scalars['Boolean'];
  isCompanionPage: Scalars['Boolean'];
};

export type PageThumbnail = {
  __typename?: 'PageThumbnail';
  propertyId: Scalars['String'];
  mediaId: Scalars['String'];
};

export type PaginatedListings = {
  __typename?: 'PaginatedListings';
  pagination?: Maybe<Pagination>;
  listings?: Maybe<Array<Maybe<Listing>>>;
};

export type Pagination = {
  __typename?: 'Pagination';
  nextKey?: Maybe<Scalars['String']>;
};

export type PaginationInput = {
  startKey?: InputMaybe<Scalars['String']>;
  limit?: InputMaybe<Scalars['Int']>;
  updatedAfter?: InputMaybe<Scalars['String']>;
};

export type Parcel = {
  __typename?: 'Parcel';
  floorPlan?: Maybe<Scalars['String']>;
  elevation?: Maybe<ParcelElevationType>;
  swing?: Maybe<Scalars['String']>;
  homesiteId?: Maybe<Scalars['String']>;
  homesite?: Maybe<Scalars['String']>;
  address?: Maybe<Scalars['String']>;
  price?: Maybe<Scalars['Int']>;
  premium?: Maybe<Scalars['Int']>;
  enhancements?: Maybe<Scalars['Int']>;
  parcelLength?: Maybe<Scalars['Int']>;
};

export enum ParcelElevationType {
  Ha = 'HA',
  Hb = 'HB',
  Hd = 'HD',
  Hd6 = 'HD6',
  He6 = 'HE6',
  Hg = 'HG',
  Hp = 'HP',
  Hp6 = 'HP6'
}

export type Point = {
  __typename?: 'Point';
  x: Scalars['Float'];
  y: Scalars['Float'];
};

export type PointOfInterest = {
  __typename?: 'PointOfInterest';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  color?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  address?: Maybe<Address>;
  geoLocation?: Maybe<GeoLocation>;
};

export type PointsOfInterestCollection = {
  __typename?: 'PointsOfInterestCollection';
  id?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  points?: Maybe<Array<Maybe<PointOfInterest>>>;
  propertyId?: Maybe<Scalars['String']>;
};

export type Property = {
  __typename?: 'Property';
  id?: Maybe<Scalars['String']>;
  neighborhood?: Maybe<Scalars['String']>;
  image?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  orbitReelName?: Maybe<Scalars['String']>;
  components?: Maybe<Array<Maybe<Component>>>;
  subDivisions?: Maybe<Array<SubDivision>>;
  orbitReels?: Maybe<Array<Maybe<OrbitReel>>>;
  galleries?: Maybe<Array<Maybe<Gallery>>>;
  amenities?: Maybe<Array<Maybe<Amenity>>>;
  mlsNames?: Maybe<Array<Maybe<Scalars['String']>>>;
  pointsOfInterestCollections?: Maybe<Array<Maybe<PointsOfInterestCollection>>>;
  controlCategories?: Maybe<Array<Maybe<ControlCategory>>>;
  developer?: Maybe<Scalars['String']>;
  interiors?: Maybe<Scalars['String']>;
  brokerage?: Maybe<Scalars['String']>;
  architect?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  listings?: Maybe<Array<Maybe<Listing>>>;
  totalFloors?: Maybe<Scalars['Int']>;
  totalUnits?: Maybe<Scalars['Int']>;
};

export enum PropertyType {
  Residential = 'RESIDENTIAL',
  Land = 'LAND',
  CommercialSale = 'COMMERCIAL_SALE',
  CommercialLease = 'COMMERCIAL_LEASE',
  PartialOwnership = 'PARTIAL_OWNERSHIP',
  Parking = 'PARKING',
  Rental = 'RENTAL',
  SoldEntryOnly = 'SOLD_ENTRY_ONLY'
}

export type Query = {
  __typename?: 'Query';
  savedSearch?: Maybe<SavedSearch>;
  savedUnit?: Maybe<Array<Maybe<SavedUnit>>>;
  paginatedListings?: Maybe<PaginatedListings>;
  paginatedListingsByStatus?: Maybe<PaginatedListings>;
  deletedListings?: Maybe<Array<Maybe<DeletedListing>>>;
  application?: Maybe<Application>;
  amenities?: Maybe<Array<Maybe<Amenity>>>;
  devices?: Maybe<Array<Maybe<Device>>>;
  regions?: Maybe<Array<Maybe<Region>>>;
  region?: Maybe<Region>;
  listAgents?: Maybe<Array<Maybe<Agent>>>;
  agent?: Maybe<Agent>;
  client?: Maybe<Client>;
  listBrokers?: Maybe<Array<Maybe<Broker>>>;
  broker?: Maybe<Broker>;
  listAllClients?: Maybe<Array<Maybe<Client>>>;
  list?: Maybe<List>;
  comp?: Maybe<Comp>;
  listings?: Maybe<Array<Maybe<Listing>>>;
  properties?: Maybe<Array<Maybe<Property>>>;
  property?: Maybe<Property>;
  component?: Maybe<Component>;
  unit?: Maybe<Unit>;
  unitModel?: Maybe<UnitModel>;
  floor?: Maybe<Floor>;
  keyPlan?: Maybe<KeyPlan>;
  listing?: Maybe<Listing>;
  listingsByStatus?: Maybe<Array<Maybe<Listing>>>;
  gallery?: Maybe<Gallery>;
  amenity?: Maybe<Amenity>;
  pointOfInterestCollection?: Maybe<PointsOfInterestCollection>;
  controlCategory?: Maybe<ControlCategory>;
  clientUnitsViewed?: Maybe<ClientUnitsViewed>;
  listViews360?: Maybe<Array<Maybe<View360>>>;
  stations: Array<Station>;
  stationDevices: Array<StationDevice>;
  screens: Array<Screen>;
  uiComponents: Array<UiComponent>;
  componentLogics: Array<ComponentLogic>;
  logicSteps: Array<LogicStep>;
  mediaPresentationLogics: Array<MediaPresentationLogic>;
  elevation?: Maybe<Elevation>;
  elevations?: Maybe<Array<Maybe<Elevation>>>;
  homeModel?: Maybe<HomeModel>;
  homeModels?: Maybe<Array<Maybe<HomeModel>>>;
  homesite?: Maybe<Homesite>;
  homesites?: Maybe<Array<Homesite>>;
  hotspots?: Maybe<Array<Maybe<Hotspot>>>;
  subDivision?: Maybe<SubDivision>;
  subDivisions?: Maybe<Array<SubDivision>>;
  savedHomesite?: Maybe<SavedHomesite>;
  listSavedHomesite?: Maybe<Array<SavedHomesite>>;
};

export type QuerySavedSearchArgs = {
  userId: Scalars['String'];
  applicationId: Scalars['String'];
  id: Scalars['String'];
};

export type QuerySavedUnitArgs = {
  userId: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
};

export type QueryPaginatedListingsArgs = {
  applicationId: Scalars['String'];
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryPaginatedListingsByStatusArgs = {
  applicationId: Scalars['String'];
  propertyId?: InputMaybe<Scalars['String']>;
  componentId?: InputMaybe<Scalars['String']>;
  unitId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
  pagination?: InputMaybe<PaginationInput>;
};

export type QueryDeletedListingsArgs = {
  applicationId: Scalars['String'];
  afterTimestamp: Scalars['String'];
};

export type QueryApplicationArgs = {
  id: Scalars['String'];
};

export type QueryAmenitiesArgs = {
  applicationId: Scalars['String'];
};

export type QueryDevicesArgs = {
  applicationId: Scalars['String'];
};

export type QueryRegionsArgs = {
  applicationId: Scalars['String'];
};

export type QueryRegionArgs = {
  applicationId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryListAgentsArgs = {
  applicationId: Scalars['String'];
};

export type QueryAgentArgs = {
  applicationId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryClientArgs = {
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryListBrokersArgs = {
  applicationId: Scalars['String'];
};

export type QueryBrokerArgs = {
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryListAllClientsArgs = {
  applicationId: Scalars['String'];
};

export type QueryListArgs = {
  applicationId: Scalars['String'];
  userId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryCompArgs = {
  applicationId: Scalars['String'];
  userId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryListingsArgs = {
  applicationId: Scalars['String'];
};

export type QueryPropertiesArgs = {
  applicationId: Scalars['String'];
};

export type QueryPropertyArgs = {
  applicationId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryComponentArgs = {
  id: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryUnitArgs = {
  id: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryUnitModelArgs = {
  id: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryFloorArgs = {
  id: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryKeyPlanArgs = {
  id: Scalars['String'];
  componentId: Scalars['String'];
  propertyId: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryListingArgs = {
  selector: ListingSelector;
};

export type QueryListingsByStatusArgs = {
  applicationId: Scalars['String'];
  propertyId?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<Scalars['String']>;
};

export type QueryGalleryArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryAmenityArgs = {
  propertyId: Scalars['String'];
  id: Scalars['String'];
  applicationId: Scalars['String'];
};

export type QueryPointOfInterestCollectionArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryControlCategoryArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryClientUnitsViewedArgs = {
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  clientId: Scalars['String'];
};

export type QueryListViews360Args = {
  input: ListViews360Input;
};

export type QueryStationsArgs = {
  applicationId: Scalars['String'];
};

export type QueryStationDevicesArgs = {
  applicationId: Scalars['String'];
  stationId: Scalars['String'];
};

export type QueryScreensArgs = {
  applicationId: Scalars['String'];
  stationId: Scalars['String'];
  stationDeviceId: Scalars['String'];
};

export type QueryUiComponentsArgs = {
  applicationId: Scalars['String'];
};

export type QueryComponentLogicsArgs = {
  applicationId: Scalars['String'];
  uiComponentId: Scalars['String'];
};

export type QueryLogicStepsArgs = {
  applicationId: Scalars['String'];
  uiComponentId: Scalars['String'];
  componentLogicId: Scalars['String'];
};

export type QueryMediaPresentationLogicsArgs = {
  applicationId: Scalars['String'];
};

export type QueryElevationArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryElevationsArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
};

export type QueryHomeModelArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryHomeModelsArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
};

export type QueryHomesiteArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  id: Scalars['String'];
};

export type QueryHomesitesArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
};

export type QueryHotspotsArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
};

export type QuerySubDivisionArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  id: Scalars['String'];
};

export type QuerySubDivisionsArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
};

export type QuerySavedHomesiteArgs = {
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  userId: Scalars['String'];
  subDivisionId: Scalars['String'];
  homeModelId: Scalars['String'];
  homesiteId: Scalars['String'];
  elevationId: Scalars['String'];
};

export type QueryListSavedHomesiteArgs = {
  applicationId: Scalars['String'];
  userId: Scalars['String'];
};

export type Region = {
  __typename?: 'Region';
  id: Scalars['String'];
  name: Scalars['String'];
  color: Scalars['String'];
  isVisibleOn3d?: Maybe<Scalars['Boolean']>;
  geoJSON?: Maybe<GeoJson>;
  latitude?: Maybe<Scalars['Float']>;
  longitude?: Maybe<Scalars['Float']>;
};

export type SageComponentAttributes = {
  __typename?: 'SageComponentAttributes';
  applicationId?: Maybe<Scalars['String']>;
  propertyLogo?: Maybe<Scalars['String']>;
  heroImage?: Maybe<Scalars['String']>;
  customAttributes?: Maybe<Array<Maybe<CustomAttribute>>>;
};

export type SageListingAttributes = {
  __typename?: 'SageListingAttributes';
  applicationId?: Maybe<Scalars['String']>;
  customAttributes?: Maybe<Array<Maybe<CustomAttribute>>>;
};

export type SageUnitAttributes = {
  __typename?: 'SageUnitAttributes';
  applicationId?: Maybe<Scalars['String']>;
  garageSpaces?: Maybe<Scalars['Int']>;
  hoaPrice?: Maybe<Scalars['Int']>;
  parkingSpaces?: Maybe<Scalars['Int']>;
  customAttributes?: Maybe<Array<Maybe<CustomAttribute>>>;
};

export type SageUnitModelAttributes = {
  __typename?: 'SageUnitModelAttributes';
  applicationId?: Maybe<Scalars['String']>;
  customAttributes?: Maybe<Array<Maybe<CustomAttribute>>>;
};

export enum SalesStatusType {
  PreSales = 'PRE_SALES',
  ForSale = 'FOR_SALE',
  SoldOut = 'SOLD_OUT',
  Resale = 'RESALE',
  Hold = 'HOLD',
  Reserved = 'RESERVED'
}

export type SavedHomesite = {
  __typename?: 'SavedHomesite';
  id: Scalars['String'];
  userId: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  subDivisionId: Scalars['String'];
  homeModelId: Scalars['String'];
  homesiteId: Scalars['String'];
  elevationId: Scalars['String'];
  name?: Maybe<Scalars['String']>;
};

export type SavedHomesiteInput = {
  id?: InputMaybe<Scalars['String']>;
  userId: Scalars['String'];
  homeModelId: Scalars['String'];
  homesiteId: Scalars['String'];
  elevationId: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
};

export type SavedManyUnit = {
  userId: Scalars['String'];
  unitId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  parcelOptions?: InputMaybe<SavedUnitParcelOptionsInput>;
};

export type SavedManyUnitInput = {
  applicationId: Scalars['String'];
  units?: InputMaybe<Array<SavedManyUnit>>;
};

export type SavedSearch = {
  __typename?: 'SavedSearch';
  id: Scalars['String'];
  userId: Scalars['String'];
  name: Scalars['String'];
  search: Scalars['String'];
  applicationId: Scalars['String'];
};

export type SavedSearchInput = {
  userId: Scalars['String'];
  name: Scalars['String'];
  search: Scalars['String'];
  applicationId: Scalars['String'];
};

export type SavedUnit = {
  __typename?: 'SavedUnit';
  id: Scalars['String'];
  userId: Scalars['String'];
  unitId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  applicationId: Scalars['String'];
  parcelOptions?: Maybe<SavedUnitParcelOptions>;
};

export type SavedUnitInput = {
  userId: Scalars['String'];
  unitId: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  applicationId: Scalars['String'];
  parcelOptions?: InputMaybe<SavedUnitParcelOptionsInput>;
};

export type SavedUnitParcelOptions = {
  __typename?: 'SavedUnitParcelOptions';
  elevation: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  floorPlan: Scalars['String'];
};

export type SavedUnitParcelOptionsInput = {
  elevation: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  floorPlan: Scalars['String'];
};

export enum ScheduleType {
  OneTime = 'ONE_TIME',
  Weekly = 'WEEKLY',
  Monthly = 'MONTHLY',
  Quarterly = 'QUARTERLY',
  Annually = 'ANNUALLY'
}

export type Screen = {
  __typename?: 'Screen';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  resolution: Point;
  position: Point;
  order: Scalars['Int'];
  stationId: Scalars['String'];
  stationDeviceId: Scalars['String'];
};

export type SendEmailInput = {
  to: Scalars['String'];
  subject: Scalars['String'];
  html: Scalars['String'];
  attachments?: InputMaybe<Array<InputMaybe<EmailAttachmentInput>>>;
};

export type SendEmailResponse = {
  __typename?: 'SendEmailResponse';
  success?: Maybe<Scalars['Boolean']>;
  message?: Maybe<Scalars['String']>;
};

export type SendEmailTo = {
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type SendShareUnitEmailInput = {
  to: SendEmailTo;
  from?: InputMaybe<Scalars['String']>;
  subject: Scalars['String'];
  emailModel: Scalars['String'];
  emailInputJson: Scalars['String'];
  replyTo: Scalars['String'];
};

export type SendShareUnitEmailStyle = {
  titleColor?: InputMaybe<Scalars['String']>;
  tableBackgroundColor?: InputMaybe<Scalars['String']>;
  tableTitleColor?: InputMaybe<Scalars['String']>;
};

export type SignMediaResponse = {
  __typename?: 'SignMediaResponse';
  key: Scalars['String'];
  mediaType: Scalars['String'];
  uploadUrl: Scalars['String'];
  path?: Maybe<Scalars['String']>;
};

export type SignUserUploadInput = {
  mediaType: Scalars['String'];
  key?: InputMaybe<Scalars['String']>;
  applicationId: Scalars['String'];
};

export type Station = {
  __typename?: 'Station';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  isTesterStation: Scalars['Boolean'];
  order: Scalars['Int'];
  devices?: Maybe<Array<Maybe<StationDevice>>>;
};

export type StationDevice = {
  __typename?: 'StationDevice';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  type: DeviceType;
  address: Scalars['String'];
  protocol: ConnectionProtocol;
  order: Scalars['Int'];
  screens?: Maybe<Array<Maybe<Screen>>>;
  stationId: Scalars['String'];
};

export type SubDivision = {
  __typename?: 'SubDivision';
  id: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
  name: Scalars['String'];
  constructionStatus?: Maybe<ConstructionStatusType>;
  address: Address;
  geoLocation?: Maybe<GeoLocation>;
  orbitReels?: Maybe<Array<Maybe<OrbitReel>>>;
  amenityIds?: Maybe<Array<Scalars['String']>>;
  pointsOfInterestCollectionIds?: Maybe<Array<Scalars['String']>>;
  controlCategoryIds?: Maybe<Array<Scalars['String']>>;
  propertyFeatures?: Maybe<Array<Scalars['String']>>;
  propertyServices?: Maybe<Array<Scalars['String']>>;
  galleries?: Maybe<Array<GalleryConnection>>;
  keyPlans?: Maybe<Array<KeyPlan>>;
  sageAttributes?: Maybe<Array<SageComponentAttributes>>;
  homesites?: Maybe<Array<Homesite>>;
  homeModels?: Maybe<Array<HomeModel>>;
  elevations?: Maybe<Array<Elevation>>;
  createdAt?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  deletedAt?: Maybe<Scalars['String']>;
};

export type UiComponent = {
  __typename?: 'UIComponent';
  applicationId: Scalars['String'];
  id: Scalars['String'];
  name: Scalars['String'];
  componentClass: Scalars['String'];
  possibleStates: Array<Scalars['String']>;
  logic?: Maybe<Array<Maybe<ComponentLogic>>>;
};

export type Unit = {
  __typename?: 'Unit';
  id?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  propertyId?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  unitModelId?: Maybe<Scalars['String']>;
  floorId?: Maybe<Scalars['String']>;
  pricingInternal?: Maybe<Scalars['Int']>;
  pricingExternal?: Maybe<Scalars['Int']>;
  availabilityDate?: Maybe<Scalars['String']>;
  unitViews?: Maybe<Array<Maybe<Scalars['String']>>>;
  inventoryType: InventoryType;
  sage?: Maybe<Array<Maybe<SageUnitAttributes>>>;
  unitModel?: Maybe<UnitModel>;
  floor?: Maybe<Floor>;
  listings?: Maybe<Array<Maybe<Listing>>>;
  salesStatus?: Maybe<Scalars['String']>;
  featureCollections?: Maybe<Array<Maybe<UnitFeatureCollection>>>;
  parcel?: Maybe<Parcel>;
  order?: Maybe<Scalars['Int']>;
  propertyType: PropertyType;
  subType?: Maybe<Scalars['String']>;
};

export type UnitFeatureCollection = {
  __typename?: 'UnitFeatureCollection';
  name: Scalars['String'];
  features?: Maybe<Array<Scalars['String']>>;
};

export type UnitModel = {
  __typename?: 'UnitModel';
  id?: Maybe<Scalars['String']>;
  componentId?: Maybe<Scalars['String']>;
  propertyId?: Maybe<Scalars['String']>;
  applicationId?: Maybe<Scalars['String']>;
  name: Scalars['String'];
  bedrooms?: Maybe<Scalars['Int']>;
  bathrooms?: Maybe<Scalars['Int']>;
  halfBathrooms?: Maybe<Scalars['Int']>;
  halfBedrooms?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['String']>;
  interiorArea?: Maybe<Scalars['Int']>;
  exteriorArea?: Maybe<Scalars['BigInt']>;
  ceilingHeight?: Maybe<Scalars['Int']>;
  ceilingHeightInches?: Maybe<Scalars['Int']>;
  linearFtWindows?: Maybe<Scalars['Int']>;
  unitType?: Maybe<UnitType>;
  amenityIds?: Maybe<Array<Maybe<Scalars['String']>>>;
  amenities?: Maybe<Array<Maybe<Amenity>>>;
  galleries?: Maybe<Array<Maybe<GalleryConnection>>>;
  sage?: Maybe<Array<Maybe<SageUnitAttributes>>>;
  floorPlan?: Maybe<FloorPlan>;
  virtualTourURL?: Maybe<Scalars['String']>;
};

export type UnitToShare = {
  name?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  floor?: InputMaybe<Scalars['String']>;
  interiorArea?: InputMaybe<Scalars['Int']>;
  ceilingHeight?: InputMaybe<Scalars['String']>;
  linearFtWindows?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['String']>;
};

export enum UnitType {
  Office = 'OFFICE',
  Retail = 'RETAIL',
  Showroom = 'SHOWROOM'
}

export type UnitViewedInput = {
  id: Scalars['String'];
  name: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  totalViews: Scalars['Int'];
};

export type UnitsViewed = {
  __typename?: 'UnitsViewed';
  id: Scalars['String'];
  name: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  totalViews: Scalars['Int'];
};

export type UpdateAgentImage = {
  id: Scalars['String'];
  applicationId: Scalars['String'];
  image?: InputMaybe<Scalars['String']>;
};

export type UpdateAgentPin = {
  applicationId: Scalars['String'];
  currentPin: Scalars['String'];
  newPin: Scalars['String'];
};

export type UpdateAgentPinError = {
  __typename?: 'UpdateAgentPinError';
  error?: Maybe<Scalars['String']>;
};

export type UpdateAgentPinSuccess = {
  __typename?: 'UpdateAgentPinSuccess';
  agent?: Maybe<Agent>;
};

export type UpdateAgentPinUnion = UpdateAgentPinSuccess | UpdateAgentPinError;

export type UpdateManySavedHomesiteInput = {
  id: Scalars['String'];
  homeModelId?: InputMaybe<Scalars['String']>;
  homesiteId?: InputMaybe<Scalars['String']>;
  elevationId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateSavedHomesiteInput = {
  homeModelId?: InputMaybe<Scalars['String']>;
  homesiteId?: InputMaybe<Scalars['String']>;
  elevationId?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
};

export type UpdateUnitInput = {
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  unitName: Scalars['String'];
  applicationId: Scalars['String'];
  customValues?: InputMaybe<Scalars['JSON']>;
};

export type View360 = {
  __typename?: 'View360';
  id: Scalars['String'];
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  mediaId: Scalars['String'];
  image?: Maybe<View360Image>;
  type: View360Type;
  manifest: View360Manifest;
  scenes: Array<Maybe<View360Scene>>;
};

export type View360Image = {
  __typename?: 'View360Image';
  thumbnailSrc: Scalars['String'];
  fullImageSrc: Scalars['String'];
};

export type View360Input = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  mediaId: Scalars['String'];
  type: View360Type;
  manifest: View360Manifest;
  scenes: Array<InputMaybe<View360SceneInput>>;
};

export enum View360Manifest {
  All = 'ALL',
  Mobile = 'MOBILE',
  Companion = 'COMPANION'
}

export type View360Scene = {
  __typename?: 'View360Scene';
  id: Scalars['String'];
  name: Scalars['String'];
  description: Scalars['String'];
  left: Scalars['Int'];
  top: Scalars['Int'];
  horizontalDegrees: Scalars['Int'];
  verticalDegrees: Scalars['Int'];
};

export type View360SceneInput = {
  id?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
  description: Scalars['String'];
  left: Scalars['Int'];
  top: Scalars['Int'];
  horizontalDegrees: Scalars['Int'];
  verticalDegrees: Scalars['Int'];
};

export enum View360Type {
  General = 'GENERAL',
  External = 'EXTERNAL',
  Internal = 'INTERNAL'
}

export type AddManySavedUnitMutationVariables = Exact<{
  input?: InputMaybe<SavedManyUnitInput>;
}>;

export type AddManySavedUnitMutation = {
  __typename?: 'Mutation';
  savedManyUnit?: Array<{
    __typename?: 'SavedUnit';
    id: string;
    userId: string;
    unitId: string;
    propertyId: string;
    componentId: string;
    applicationId: string;
  } | null> | null;
};

export type AddSavedUnitMutationVariables = Exact<{
  input: SavedUnitInput;
}>;

export type AddSavedUnitMutation = {
  __typename?: 'Mutation';
  savedUnit?: {
    __typename?: 'SavedUnit';
    id: string;
    userId: string;
    unitId: string;
    propertyId: string;
    componentId: string;
    applicationId: string;
  } | null;
};

export type ConnectDeviceMutationVariables = Exact<{
  input: ConnectDeviceInput;
}>;

export type ConnectDeviceMutation = {
  __typename?: 'Mutation';
  connectDevice?: {
    __typename?: 'Device';
    id: string;
    name: string;
    connectionId?: string | null;
    applicationId: string;
  } | null;
};

export type CreateBrokerMutationVariables = Exact<{
  input: CreateBrokerInput;
}>;

export type CreateBrokerMutation = {
  __typename?: 'Mutation';
  createBroker?: {
    __typename?: 'Broker';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    company?: string | null;
    email?: string | null;
    title?: string | null;
  } | null;
};

export type CreateClientMutationVariables = Exact<{
  input: CreateClientInput;
}>;

export type CreateClientMutation = {
  __typename?: 'Mutation';
  createClient?: {
    __typename?: 'Client';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    agentId?: string | null;
    applicationId: string;
    phone?: string | null;
    company?: string | null;
    street?: string | null;
    city?: string | null;
    country?: string | null;
    state?: string | null;
    firstVisit?: boolean | null;
    hearAboutUs?: string | null;
  } | null;
};

export type DeleteClientMutationVariables = Exact<{
  id: Scalars['String'];
  agentId: Scalars['String'];
  applicationId: Scalars['String'];
}>;

export type DeleteClientMutation = {
  __typename?: 'Mutation';
  deleteClient?: {
    __typename?: 'Client';
    id?: string | null;
    agentId?: string | null;
    applicationId: string;
  } | null;
};

export type DeleteManySavedUnitMutationVariables = Exact<{
  input?: InputMaybe<DeleteManyUnitInput>;
}>;

export type DeleteManySavedUnitMutation = {
  __typename?: 'Mutation';
  deleteManySavedUnit?: Array<{
    __typename?: 'SavedUnit';
    id: string;
    userId: string;
    unitId: string;
    propertyId: string;
    componentId: string;
    applicationId: string;
  } | null> | null;
};

export type DeleteSavedUnitMutationVariables = Exact<{
  applicationId: Scalars['String'];
  input: DeleteSavedUnitInput;
}>;

export type DeleteSavedUnitMutation = {
  __typename?: 'Mutation';
  deleteSavedUnit?: {
    __typename?: 'SavedUnit';
    id: string;
    userId: string;
    unitId: string;
    propertyId: string;
    componentId: string;
    applicationId: string;
  } | null;
};

export type GetAgentQueryVariables = Exact<{
  applicationId: Scalars['String'];
  id: Scalars['String'];
}>;

export type GetAgentQuery = {
  __typename?: 'Query';
  agent?: {
    __typename?: 'Agent';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    image?: string | null;
  } | null;
};

export type GetBrokerQueryVariables = Exact<{
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  id: Scalars['String'];
}>;

export type GetBrokerQuery = {
  __typename?: 'Query';
  broker?: {
    __typename?: 'Broker';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    company?: string | null;
    title?: string | null;
    agentId: string;
    applicationId: string;
  } | null;
};

export type GetClientQueryVariables = Exact<{
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  id: Scalars['String'];
}>;

export type GetClientQuery = {
  __typename?: 'Query';
  client?: {
    __typename?: 'Client';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    agentId?: string | null;
    applicationId: string;
    brokerId?: string | null;
    phone?: string | null;
    company?: string | null;
    street?: string | null;
    city?: string | null;
    country?: string | null;
    state?: string | null;
    firstVisit?: boolean | null;
    hearAboutUs?: string | null;
    savedUnits?: Array<{
      __typename?: 'SavedUnit';
      id: string;
      userId: string;
      unitId: string;
      propertyId: string;
      componentId: string;
      applicationId: string;
    } | null> | null;
  } | null;
};

export type GetClientUnitsViewedQueryVariables = Exact<{
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
  clientId: Scalars['String'];
}>;

export type GetClientUnitsViewedQuery = {
  __typename?: 'Query';
  clientUnitsViewed?: {
    __typename?: 'ClientUnitsViewed';
    id: string;
    applicationId: string;
    clientId: string;
    agentId: string;
    units?: Array<{
      __typename?: 'UnitsViewed';
      id: string;
      name: string;
      propertyId: string;
      componentId: string;
      totalViews: number;
    } | null> | null;
  } | null;
};

export type ListAgentsQueryVariables = Exact<{
  applicationId: Scalars['String'];
}>;

export type ListAgentsQuery = {
  __typename?: 'Query';
  listAgents?: Array<{
    __typename?: 'Agent';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
  } | null> | null;
};

export type ListAllClientsQueryVariables = Exact<{
  applicationId: Scalars['String'];
}>;

export type ListAllClientsQuery = {
  __typename?: 'Query';
  listAllClients?: Array<{
    __typename?: 'Client';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    agentId?: string | null;
    applicationId: string;
    phone?: string | null;
    company?: string | null;
    street?: string | null;
    city?: string | null;
    country?: string | null;
    state?: string | null;
    firstVisit?: boolean | null;
    hearAboutUs?: string | null;
    savedUnits?: Array<{
      __typename?: 'SavedUnit';
      id: string;
      userId: string;
      unitId: string;
      propertyId: string;
      componentId: string;
      applicationId: string;
    } | null> | null;
  } | null> | null;
};

export type ListAmenitiesQueryVariables = Exact<{
  applicationId: Scalars['String'];
}>;

export type ListAmenitiesQuery = {
  __typename?: 'Query';
  amenities?: Array<{
    __typename?: 'Amenity';
    id?: string | null;
    propertyId: string;
    name: string;
    description?: string | null;
  } | null> | null;
};

export type ListBrokersQueryVariables = Exact<{
  applicationId: Scalars['String'];
}>;

export type ListBrokersQuery = {
  __typename?: 'Query';
  listBrokers?: Array<{
    __typename?: 'Broker';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    company?: string | null;
    title?: string | null;
    agentId: string;
    applicationId: string;
  } | null> | null;
};

export type ListDevicesQueryVariables = Exact<{
  applicationId: Scalars['String'];
}>;

export type ListDevicesQuery = {
  __typename?: 'Query';
  devices?: Array<{
    __typename?: 'Device';
    id: string;
    name: string;
    connectionId?: string | null;
  } | null> | null;
};

export type ListHotspotsQueryVariables = Exact<{
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
}>;

export type ListHotspotsQuery = {
  __typename?: 'Query';
  hotspots?: Array<{
    __typename?: 'Hotspot';
    id: string;
    name: string;
    mediaId?: string | null;
    towerId?: string | null;
    type: HotspotType;
    map?: Array<{
      __typename?: 'HotspotMap';
      name: string;
      category?: string | null;
      descriptionPopUp?: string | null;
      tag?: string | null;
      x: number;
      y: number;
      width?: number | null;
      height?: number | null;
    }> | null;
  } | null> | null;
};

export type ListSavedUnitQueryVariables = Exact<{
  userId: Scalars['String'];
  applicationId: Scalars['String'];
  propertyId: Scalars['String'];
}>;

export type ListSavedUnitQuery = {
  __typename?: 'Query';
  savedUnit?: Array<{
    __typename?: 'SavedUnit';
    id: string;
    userId: string;
    unitId: string;
    propertyId: string;
    componentId: string;
    applicationId: string;
  } | null> | null;
};

export type ListViews360QueryVariables = Exact<{
  input: ListViews360Input;
}>;

export type ListViews360Query = {
  __typename?: 'Query';
  listViews360?: Array<{
    __typename?: 'View360';
    id: string;
    name: string;
    description: string;
    mediaId: string;
    image?: {
      __typename?: 'View360Image';
      thumbnailSrc: string;
      fullImageSrc: string;
    } | null;
    scenes: Array<{
      __typename?: 'View360Scene';
      id: string;
      name: string;
      description: string;
      left: number;
      top: number;
      horizontalDegrees: number;
      verticalDegrees: number;
    } | null>;
  } | null> | null;
};

export type LoginWithPinMutationVariables = Exact<{
  applicationId: Scalars['String'];
  userId: Scalars['String'];
  pin: Scalars['String'];
}>;

export type LoginWithPinMutation = {
  __typename?: 'Mutation';
  loginWithPin?:
    | { __typename: 'LoginSuccess'; token?: string | null }
    | {
        __typename: 'LoginError';
        error?: string | null;
        message?: string | null;
      }
    | null;
};

export type QueryClientsQueryVariables = Exact<{
  applicationId: Scalars['String'];
  agentId: Scalars['String'];
}>;

export type QueryClientsQuery = {
  __typename?: 'Query';
  agent?: {
    __typename?: 'Agent';
    id?: string | null;
    clients?: Array<{
      __typename?: 'Client';
      id?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      email?: string | null;
      agentId?: string | null;
      applicationId: string;
      phone?: string | null;
      company?: string | null;
      street?: string | null;
      city?: string | null;
      country?: string | null;
      state?: string | null;
      firstVisit?: boolean | null;
      hearAboutUs?: string | null;
    } | null> | null;
  } | null;
};

export type QueryPropertyQueryVariables = Exact<{
  applicationId: Scalars['String'];
  id: Scalars['String'];
}>;

export type QueryPropertyQuery = {
  __typename?: 'Query';
  property?: {
    __typename?: 'Property';
    id?: string | null;
    name: string;
    image?: string | null;
    components?: Array<{
      __typename?: 'Component';
      id?: string | null;
      name: string;
      address?: {
        __typename?: 'Address';
        addressLine1?: string | null;
        addressLine2?: string | null;
        city?: string | null;
        province?: string | null;
        postalCode?: string | null;
        countryCode?: string | null;
        region?: string | null;
      } | null;
      unitModels?: Array<{
        __typename?: 'UnitModel';
        id?: string | null;
        name: string;
        bedrooms?: number | null;
        halfBedrooms?: number | null;
        bathrooms?: number | null;
        halfBathrooms?: number | null;
        interiorArea?: number | null;
        exteriorArea?: any | null;
      } | null> | null;
      units?: Array<{
        __typename?: 'Unit';
        id?: string | null;
        name: string;
        unitModelId?: string | null;
        salesStatus?: string | null;
        unitViews?: Array<string | null> | null;
        pricingInternal?: number | null;
        pricingExternal?: number | null;
        floor?: {
          __typename?: 'Floor';
          id?: string | null;
          name?: string | null;
          keyPlan?: {
            __typename?: 'KeyPlan';
            name?: string | null;
            media?: string | null;
            minimap?: {
              __typename?: 'KeyPlanMinimap';
              svgUrl?: string | null;
              unitModelGroups?: Array<{
                __typename?: 'MinimapGroup';
                groupId?: string | null;
                externalIds?: Array<string | null> | null;
              } | null> | null;
            } | null;
          } | null;
        } | null;
        featureCollections?: Array<{
          __typename?: 'UnitFeatureCollection';
          name: string;
          features?: Array<string> | null;
        } | null> | null;
        sage?: Array<{
          __typename?: 'SageUnitAttributes';
          customAttributes?: Array<{
            __typename?: 'CustomAttribute';
            name?: string | null;
            value?: string | null;
          } | null> | null;
        } | null> | null;
      } | null> | null;
      floors?: Array<{
        __typename?: 'Floor';
        id?: string | null;
        name?: string | null;
      } | null> | null;
      keyPlans?: Array<{
        __typename?: 'KeyPlan';
        id?: string | null;
        name?: string | null;
        media?: string | null;
        minimap?: {
          __typename?: 'KeyPlanMinimap';
          svgUrl?: string | null;
          unitModelGroups?: Array<{
            __typename?: 'MinimapGroup';
            groupId?: string | null;
            externalIds?: Array<string | null> | null;
          } | null> | null;
        } | null;
      } | null> | null;
      amenities?: Array<{
        __typename?: 'Amenity';
        id?: string | null;
        name: string;
        description?: string | null;
      } | null> | null;
      orbitReels?: Array<{
        __typename?: 'OrbitReel';
        id?: string | null;
        label?: string | null;
        colorMap?: Array<{
          __typename?: 'OrbitReelHighlightColor';
          color: string;
          label?: string | null;
          status?: string | null;
          currentUnit?: boolean | null;
        } | null> | null;
      } | null> | null;
      pointsOfInterestCollections?: Array<{
        __typename?: 'PointsOfInterestCollection';
        id?: string | null;
        name?: string | null;
        points?: Array<{
          __typename?: 'PointOfInterest';
          name?: string | null;
          color?: string | null;
        } | null> | null;
      } | null> | null;
      controlCategories?: Array<{
        __typename?: 'ControlCategory';
        id?: string | null;
        name?: string | null;
        enableCommand?: string | null;
        disableCommand?: string | null;
      } | null> | null;
    } | null> | null;
    amenities?: Array<{
      __typename?: 'Amenity';
      id?: string | null;
      name: string;
      description?: string | null;
    } | null> | null;
    orbitReels?: Array<{
      __typename?: 'OrbitReel';
      id?: string | null;
      label?: string | null;
    } | null> | null;
    controlCategories?: Array<{
      __typename?: 'ControlCategory';
      id?: string | null;
      name?: string | null;
      enableCommand?: string | null;
      disableCommand?: string | null;
    } | null> | null;
  } | null;
};

export type SendShareUnitEmailMutationVariables = Exact<{
  applicationId: Scalars['String'];
  input: SendShareUnitEmailInput;
}>;

export type SendShareUnitEmailMutation = {
  __typename?: 'Mutation';
  sendShareUnitEmail?: {
    __typename?: 'SendEmailResponse';
    success?: boolean | null;
    message?: string | null;
  } | null;
};

export type UpdateClientMutationVariables = Exact<{
  id: Scalars['String'];
  input: ClientInput;
}>;

export type UpdateClientMutation = {
  __typename?: 'Mutation';
  updateClient?: {
    __typename?: 'Client';
    id?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    agentId?: string | null;
    applicationId: string;
    brokerId?: string | null;
    phone?: string | null;
    company?: string | null;
    street?: string | null;
    city?: string | null;
    country?: string | null;
    state?: string | null;
    firstVisit?: boolean | null;
    hearAboutUs?: string | null;
    savedUnits?: Array<{
      __typename?: 'SavedUnit';
      id: string;
      userId: string;
      unitId: string;
      propertyId: string;
      componentId: string;
      applicationId: string;
    } | null> | null;
  } | null;
};

export const AddManySavedUnitDocument = gql`
  mutation AddManySavedUnit($input: SavedManyUnitInput) {
    savedManyUnit(input: $input) {
      id
      userId
      unitId
      propertyId
      componentId
      applicationId
    }
  }
`;
export type AddManySavedUnitMutationFn = Apollo.MutationFunction<
  AddManySavedUnitMutation,
  AddManySavedUnitMutationVariables
>;

/**
 * __useAddManySavedUnitMutation__
 *
 * To run a mutation, you first call `useAddManySavedUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddManySavedUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addManySavedUnitMutation, { data, loading, error }] = useAddManySavedUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddManySavedUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddManySavedUnitMutation,
    AddManySavedUnitMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddManySavedUnitMutation,
    AddManySavedUnitMutationVariables
  >(AddManySavedUnitDocument, options);
}
export type AddManySavedUnitMutationHookResult = ReturnType<
  typeof useAddManySavedUnitMutation
>;
export type AddManySavedUnitMutationResult =
  Apollo.MutationResult<AddManySavedUnitMutation>;
export type AddManySavedUnitMutationOptions = Apollo.BaseMutationOptions<
  AddManySavedUnitMutation,
  AddManySavedUnitMutationVariables
>;
export const AddSavedUnitDocument = gql`
  mutation AddSavedUnit($input: SavedUnitInput!) {
    savedUnit(input: $input) {
      id
      userId
      unitId
      propertyId
      componentId
      applicationId
    }
  }
`;
export type AddSavedUnitMutationFn = Apollo.MutationFunction<
  AddSavedUnitMutation,
  AddSavedUnitMutationVariables
>;

/**
 * __useAddSavedUnitMutation__
 *
 * To run a mutation, you first call `useAddSavedUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddSavedUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addSavedUnitMutation, { data, loading, error }] = useAddSavedUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddSavedUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    AddSavedUnitMutation,
    AddSavedUnitMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    AddSavedUnitMutation,
    AddSavedUnitMutationVariables
  >(AddSavedUnitDocument, options);
}
export type AddSavedUnitMutationHookResult = ReturnType<
  typeof useAddSavedUnitMutation
>;
export type AddSavedUnitMutationResult =
  Apollo.MutationResult<AddSavedUnitMutation>;
export type AddSavedUnitMutationOptions = Apollo.BaseMutationOptions<
  AddSavedUnitMutation,
  AddSavedUnitMutationVariables
>;
export const ConnectDeviceDocument = gql`
  mutation ConnectDevice($input: ConnectDeviceInput!) {
    connectDevice(input: $input) {
      id
      name
      connectionId
      applicationId
    }
  }
`;
export type ConnectDeviceMutationFn = Apollo.MutationFunction<
  ConnectDeviceMutation,
  ConnectDeviceMutationVariables
>;

/**
 * __useConnectDeviceMutation__
 *
 * To run a mutation, you first call `useConnectDeviceMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useConnectDeviceMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [connectDeviceMutation, { data, loading, error }] = useConnectDeviceMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useConnectDeviceMutation(
  baseOptions?: Apollo.MutationHookOptions<
    ConnectDeviceMutation,
    ConnectDeviceMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    ConnectDeviceMutation,
    ConnectDeviceMutationVariables
  >(ConnectDeviceDocument, options);
}
export type ConnectDeviceMutationHookResult = ReturnType<
  typeof useConnectDeviceMutation
>;
export type ConnectDeviceMutationResult =
  Apollo.MutationResult<ConnectDeviceMutation>;
export type ConnectDeviceMutationOptions = Apollo.BaseMutationOptions<
  ConnectDeviceMutation,
  ConnectDeviceMutationVariables
>;
export const CreateBrokerDocument = gql`
  mutation CreateBroker($input: CreateBrokerInput!) {
    createBroker(input: $input) {
      id
      firstName
      lastName
      phone
      company
      email
      title
    }
  }
`;
export type CreateBrokerMutationFn = Apollo.MutationFunction<
  CreateBrokerMutation,
  CreateBrokerMutationVariables
>;

/**
 * __useCreateBrokerMutation__
 *
 * To run a mutation, you first call `useCreateBrokerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBrokerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBrokerMutation, { data, loading, error }] = useCreateBrokerMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateBrokerMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateBrokerMutation,
    CreateBrokerMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateBrokerMutation,
    CreateBrokerMutationVariables
  >(CreateBrokerDocument, options);
}
export type CreateBrokerMutationHookResult = ReturnType<
  typeof useCreateBrokerMutation
>;
export type CreateBrokerMutationResult =
  Apollo.MutationResult<CreateBrokerMutation>;
export type CreateBrokerMutationOptions = Apollo.BaseMutationOptions<
  CreateBrokerMutation,
  CreateBrokerMutationVariables
>;
export const CreateClientDocument = gql`
  mutation CreateClient($input: CreateClientInput!) {
    createClient(input: $input) {
      id
      firstName
      lastName
      email
      agentId
      applicationId
      phone
      company
      street
      city
      country
      state
      firstVisit
      hearAboutUs
    }
  }
`;
export type CreateClientMutationFn = Apollo.MutationFunction<
  CreateClientMutation,
  CreateClientMutationVariables
>;

/**
 * __useCreateClientMutation__
 *
 * To run a mutation, you first call `useCreateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createClientMutation, { data, loading, error }] = useCreateClientMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateClientMutation,
    CreateClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateClientMutation,
    CreateClientMutationVariables
  >(CreateClientDocument, options);
}
export type CreateClientMutationHookResult = ReturnType<
  typeof useCreateClientMutation
>;
export type CreateClientMutationResult =
  Apollo.MutationResult<CreateClientMutation>;
export type CreateClientMutationOptions = Apollo.BaseMutationOptions<
  CreateClientMutation,
  CreateClientMutationVariables
>;
export const DeleteClientDocument = gql`
  mutation DeleteClient(
    $id: String!
    $agentId: String!
    $applicationId: String!
  ) {
    deleteClient(id: $id, agentId: $agentId, applicationId: $applicationId) {
      id
      agentId
      applicationId
    }
  }
`;
export type DeleteClientMutationFn = Apollo.MutationFunction<
  DeleteClientMutation,
  DeleteClientMutationVariables
>;

/**
 * __useDeleteClientMutation__
 *
 * To run a mutation, you first call `useDeleteClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteClientMutation, { data, loading, error }] = useDeleteClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      agentId: // value for 'agentId'
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useDeleteClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteClientMutation,
    DeleteClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteClientMutation,
    DeleteClientMutationVariables
  >(DeleteClientDocument, options);
}
export type DeleteClientMutationHookResult = ReturnType<
  typeof useDeleteClientMutation
>;
export type DeleteClientMutationResult =
  Apollo.MutationResult<DeleteClientMutation>;
export type DeleteClientMutationOptions = Apollo.BaseMutationOptions<
  DeleteClientMutation,
  DeleteClientMutationVariables
>;
export const DeleteManySavedUnitDocument = gql`
  mutation DeleteManySavedUnit($input: DeleteManyUnitInput) {
    deleteManySavedUnit(input: $input) {
      id
      userId
      unitId
      propertyId
      componentId
      applicationId
    }
  }
`;
export type DeleteManySavedUnitMutationFn = Apollo.MutationFunction<
  DeleteManySavedUnitMutation,
  DeleteManySavedUnitMutationVariables
>;

/**
 * __useDeleteManySavedUnitMutation__
 *
 * To run a mutation, you first call `useDeleteManySavedUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteManySavedUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteManySavedUnitMutation, { data, loading, error }] = useDeleteManySavedUnitMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteManySavedUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteManySavedUnitMutation,
    DeleteManySavedUnitMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteManySavedUnitMutation,
    DeleteManySavedUnitMutationVariables
  >(DeleteManySavedUnitDocument, options);
}
export type DeleteManySavedUnitMutationHookResult = ReturnType<
  typeof useDeleteManySavedUnitMutation
>;
export type DeleteManySavedUnitMutationResult =
  Apollo.MutationResult<DeleteManySavedUnitMutation>;
export type DeleteManySavedUnitMutationOptions = Apollo.BaseMutationOptions<
  DeleteManySavedUnitMutation,
  DeleteManySavedUnitMutationVariables
>;
export const DeleteSavedUnitDocument = gql`
  mutation DeleteSavedUnit(
    $applicationId: String!
    $input: DeleteSavedUnitInput!
  ) {
    deleteSavedUnit(applicationId: $applicationId, input: $input) {
      id
      userId
      unitId
      propertyId
      componentId
      applicationId
    }
  }
`;
export type DeleteSavedUnitMutationFn = Apollo.MutationFunction<
  DeleteSavedUnitMutation,
  DeleteSavedUnitMutationVariables
>;

/**
 * __useDeleteSavedUnitMutation__
 *
 * To run a mutation, you first call `useDeleteSavedUnitMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSavedUnitMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSavedUnitMutation, { data, loading, error }] = useDeleteSavedUnitMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useDeleteSavedUnitMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteSavedUnitMutation,
    DeleteSavedUnitMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteSavedUnitMutation,
    DeleteSavedUnitMutationVariables
  >(DeleteSavedUnitDocument, options);
}
export type DeleteSavedUnitMutationHookResult = ReturnType<
  typeof useDeleteSavedUnitMutation
>;
export type DeleteSavedUnitMutationResult =
  Apollo.MutationResult<DeleteSavedUnitMutation>;
export type DeleteSavedUnitMutationOptions = Apollo.BaseMutationOptions<
  DeleteSavedUnitMutation,
  DeleteSavedUnitMutationVariables
>;
export const GetAgentDocument = gql`
  query GetAgent($applicationId: String!, $id: String!) {
    agent(applicationId: $applicationId, id: $id) {
      id
      firstName
      lastName
      email
      image
    }
  }
`;

/**
 * __useGetAgentQuery__
 *
 * To run a query within a React component, call `useGetAgentQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAgentQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAgentQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetAgentQuery(
  baseOptions: Apollo.QueryHookOptions<GetAgentQuery, GetAgentQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetAgentQuery, GetAgentQueryVariables>(
    GetAgentDocument,
    options
  );
}
export function useGetAgentLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetAgentQuery,
    GetAgentQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetAgentQuery, GetAgentQueryVariables>(
    GetAgentDocument,
    options
  );
}
export type GetAgentQueryHookResult = ReturnType<typeof useGetAgentQuery>;
export type GetAgentLazyQueryHookResult = ReturnType<
  typeof useGetAgentLazyQuery
>;
export type GetAgentQueryResult = Apollo.QueryResult<
  GetAgentQuery,
  GetAgentQueryVariables
>;
export const GetBrokerDocument = gql`
  query GetBroker($applicationId: String!, $agentId: String!, $id: String!) {
    broker(applicationId: $applicationId, agentId: $agentId, id: $id) {
      id
      firstName
      lastName
      email
      phone
      company
      title
      agentId
      applicationId
    }
  }
`;

/**
 * __useGetBrokerQuery__
 *
 * To run a query within a React component, call `useGetBrokerQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetBrokerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetBrokerQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      agentId: // value for 'agentId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetBrokerQuery(
  baseOptions: Apollo.QueryHookOptions<GetBrokerQuery, GetBrokerQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetBrokerQuery, GetBrokerQueryVariables>(
    GetBrokerDocument,
    options
  );
}
export function useGetBrokerLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetBrokerQuery,
    GetBrokerQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetBrokerQuery, GetBrokerQueryVariables>(
    GetBrokerDocument,
    options
  );
}
export type GetBrokerQueryHookResult = ReturnType<typeof useGetBrokerQuery>;
export type GetBrokerLazyQueryHookResult = ReturnType<
  typeof useGetBrokerLazyQuery
>;
export type GetBrokerQueryResult = Apollo.QueryResult<
  GetBrokerQuery,
  GetBrokerQueryVariables
>;
export const GetClientDocument = gql`
  query GetClient($applicationId: String!, $agentId: String!, $id: String!) {
    client(applicationId: $applicationId, agentId: $agentId, id: $id) {
      id
      firstName
      lastName
      email
      agentId
      applicationId
      brokerId
      phone
      company
      street
      city
      country
      state
      firstVisit
      hearAboutUs
      savedUnits {
        id
        userId
        unitId
        propertyId
        componentId
        applicationId
      }
    }
  }
`;

/**
 * __useGetClientQuery__
 *
 * To run a query within a React component, call `useGetClientQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      agentId: // value for 'agentId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetClientQuery(
  baseOptions: Apollo.QueryHookOptions<GetClientQuery, GetClientQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetClientQuery, GetClientQueryVariables>(
    GetClientDocument,
    options
  );
}
export function useGetClientLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClientQuery,
    GetClientQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetClientQuery, GetClientQueryVariables>(
    GetClientDocument,
    options
  );
}
export type GetClientQueryHookResult = ReturnType<typeof useGetClientQuery>;
export type GetClientLazyQueryHookResult = ReturnType<
  typeof useGetClientLazyQuery
>;
export type GetClientQueryResult = Apollo.QueryResult<
  GetClientQuery,
  GetClientQueryVariables
>;
export const GetClientUnitsViewedDocument = gql`
  query GetClientUnitsViewed(
    $applicationId: String!
    $agentId: String!
    $clientId: String!
  ) {
    clientUnitsViewed(
      applicationId: $applicationId
      agentId: $agentId
      clientId: $clientId
    ) {
      id
      applicationId
      clientId
      agentId
      units {
        id
        name
        propertyId
        componentId
        totalViews
      }
    }
  }
`;

/**
 * __useGetClientUnitsViewedQuery__
 *
 * To run a query within a React component, call `useGetClientUnitsViewedQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetClientUnitsViewedQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetClientUnitsViewedQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      agentId: // value for 'agentId'
 *      clientId: // value for 'clientId'
 *   },
 * });
 */
export function useGetClientUnitsViewedQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetClientUnitsViewedQuery,
    GetClientUnitsViewedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetClientUnitsViewedQuery,
    GetClientUnitsViewedQueryVariables
  >(GetClientUnitsViewedDocument, options);
}
export function useGetClientUnitsViewedLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetClientUnitsViewedQuery,
    GetClientUnitsViewedQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetClientUnitsViewedQuery,
    GetClientUnitsViewedQueryVariables
  >(GetClientUnitsViewedDocument, options);
}
export type GetClientUnitsViewedQueryHookResult = ReturnType<
  typeof useGetClientUnitsViewedQuery
>;
export type GetClientUnitsViewedLazyQueryHookResult = ReturnType<
  typeof useGetClientUnitsViewedLazyQuery
>;
export type GetClientUnitsViewedQueryResult = Apollo.QueryResult<
  GetClientUnitsViewedQuery,
  GetClientUnitsViewedQueryVariables
>;
export const ListAgentsDocument = gql`
  query listAgents($applicationId: String!) {
    listAgents(applicationId: $applicationId) {
      id
      firstName
      lastName
    }
  }
`;

/**
 * __useListAgentsQuery__
 *
 * To run a query within a React component, call `useListAgentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAgentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAgentsQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useListAgentsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListAgentsQuery,
    ListAgentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListAgentsQuery, ListAgentsQueryVariables>(
    ListAgentsDocument,
    options
  );
}
export function useListAgentsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListAgentsQuery,
    ListAgentsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListAgentsQuery, ListAgentsQueryVariables>(
    ListAgentsDocument,
    options
  );
}
export type ListAgentsQueryHookResult = ReturnType<typeof useListAgentsQuery>;
export type ListAgentsLazyQueryHookResult = ReturnType<
  typeof useListAgentsLazyQuery
>;
export type ListAgentsQueryResult = Apollo.QueryResult<
  ListAgentsQuery,
  ListAgentsQueryVariables
>;
export const ListAllClientsDocument = gql`
  query ListAllClients($applicationId: String!) {
    listAllClients(applicationId: $applicationId) {
      id
      firstName
      lastName
      email
      agentId
      applicationId
      phone
      company
      street
      city
      country
      state
      firstVisit
      hearAboutUs
      savedUnits {
        id
        userId
        unitId
        propertyId
        componentId
        applicationId
      }
    }
  }
`;

/**
 * __useListAllClientsQuery__
 *
 * To run a query within a React component, call `useListAllClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAllClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAllClientsQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useListAllClientsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListAllClientsQuery,
    ListAllClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListAllClientsQuery, ListAllClientsQueryVariables>(
    ListAllClientsDocument,
    options
  );
}
export function useListAllClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListAllClientsQuery,
    ListAllClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListAllClientsQuery, ListAllClientsQueryVariables>(
    ListAllClientsDocument,
    options
  );
}
export type ListAllClientsQueryHookResult = ReturnType<
  typeof useListAllClientsQuery
>;
export type ListAllClientsLazyQueryHookResult = ReturnType<
  typeof useListAllClientsLazyQuery
>;
export type ListAllClientsQueryResult = Apollo.QueryResult<
  ListAllClientsQuery,
  ListAllClientsQueryVariables
>;
export const ListAmenitiesDocument = gql`
  query ListAmenities($applicationId: String!) {
    amenities(applicationId: $applicationId) {
      id
      propertyId
      name
      description
    }
  }
`;

/**
 * __useListAmenitiesQuery__
 *
 * To run a query within a React component, call `useListAmenitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListAmenitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListAmenitiesQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useListAmenitiesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListAmenitiesQuery,
    ListAmenitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListAmenitiesQuery, ListAmenitiesQueryVariables>(
    ListAmenitiesDocument,
    options
  );
}
export function useListAmenitiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListAmenitiesQuery,
    ListAmenitiesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListAmenitiesQuery, ListAmenitiesQueryVariables>(
    ListAmenitiesDocument,
    options
  );
}
export type ListAmenitiesQueryHookResult = ReturnType<
  typeof useListAmenitiesQuery
>;
export type ListAmenitiesLazyQueryHookResult = ReturnType<
  typeof useListAmenitiesLazyQuery
>;
export type ListAmenitiesQueryResult = Apollo.QueryResult<
  ListAmenitiesQuery,
  ListAmenitiesQueryVariables
>;
export const ListBrokersDocument = gql`
  query ListBrokers($applicationId: String!) {
    listBrokers(applicationId: $applicationId) {
      id
      firstName
      lastName
      email
      phone
      company
      title
      agentId
      applicationId
    }
  }
`;

/**
 * __useListBrokersQuery__
 *
 * To run a query within a React component, call `useListBrokersQuery` and pass it any options that fit your needs.
 * When your component renders, `useListBrokersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListBrokersQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useListBrokersQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListBrokersQuery,
    ListBrokersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListBrokersQuery, ListBrokersQueryVariables>(
    ListBrokersDocument,
    options
  );
}
export function useListBrokersLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListBrokersQuery,
    ListBrokersQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListBrokersQuery, ListBrokersQueryVariables>(
    ListBrokersDocument,
    options
  );
}
export type ListBrokersQueryHookResult = ReturnType<typeof useListBrokersQuery>;
export type ListBrokersLazyQueryHookResult = ReturnType<
  typeof useListBrokersLazyQuery
>;
export type ListBrokersQueryResult = Apollo.QueryResult<
  ListBrokersQuery,
  ListBrokersQueryVariables
>;
export const ListDevicesDocument = gql`
  query ListDevices($applicationId: String!) {
    devices(applicationId: $applicationId) {
      id
      name
      connectionId
    }
  }
`;

/**
 * __useListDevicesQuery__
 *
 * To run a query within a React component, call `useListDevicesQuery` and pass it any options that fit your needs.
 * When your component renders, `useListDevicesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListDevicesQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useListDevicesQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListDevicesQuery,
    ListDevicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListDevicesQuery, ListDevicesQueryVariables>(
    ListDevicesDocument,
    options
  );
}
export function useListDevicesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListDevicesQuery,
    ListDevicesQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListDevicesQuery, ListDevicesQueryVariables>(
    ListDevicesDocument,
    options
  );
}
export type ListDevicesQueryHookResult = ReturnType<typeof useListDevicesQuery>;
export type ListDevicesLazyQueryHookResult = ReturnType<
  typeof useListDevicesLazyQuery
>;
export type ListDevicesQueryResult = Apollo.QueryResult<
  ListDevicesQuery,
  ListDevicesQueryVariables
>;
export const ListHotspotsDocument = gql`
  query ListHotspots($applicationId: String!, $propertyId: String!) {
    hotspots(applicationId: $applicationId, propertyId: $propertyId) {
      id
      name
      mediaId
      towerId
      type
      map {
        name
        category
        descriptionPopUp
        tag
        x
        y
        width
        height
      }
    }
  }
`;

/**
 * __useListHotspotsQuery__
 *
 * To run a query within a React component, call `useListHotspotsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListHotspotsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListHotspotsQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useListHotspotsQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListHotspotsQuery,
    ListHotspotsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListHotspotsQuery, ListHotspotsQueryVariables>(
    ListHotspotsDocument,
    options
  );
}
export function useListHotspotsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListHotspotsQuery,
    ListHotspotsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListHotspotsQuery, ListHotspotsQueryVariables>(
    ListHotspotsDocument,
    options
  );
}
export type ListHotspotsQueryHookResult = ReturnType<
  typeof useListHotspotsQuery
>;
export type ListHotspotsLazyQueryHookResult = ReturnType<
  typeof useListHotspotsLazyQuery
>;
export type ListHotspotsQueryResult = Apollo.QueryResult<
  ListHotspotsQuery,
  ListHotspotsQueryVariables
>;
export const ListSavedUnitDocument = gql`
  query ListSavedUnit(
    $userId: String!
    $applicationId: String!
    $propertyId: String!
  ) {
    savedUnit(
      userId: $userId
      applicationId: $applicationId
      propertyId: $propertyId
    ) {
      id
      userId
      unitId
      propertyId
      componentId
      applicationId
    }
  }
`;

/**
 * __useListSavedUnitQuery__
 *
 * To run a query within a React component, call `useListSavedUnitQuery` and pass it any options that fit your needs.
 * When your component renders, `useListSavedUnitQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListSavedUnitQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *      applicationId: // value for 'applicationId'
 *      propertyId: // value for 'propertyId'
 *   },
 * });
 */
export function useListSavedUnitQuery(
  baseOptions: Apollo.QueryHookOptions<
    ListSavedUnitQuery,
    ListSavedUnitQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListSavedUnitQuery, ListSavedUnitQueryVariables>(
    ListSavedUnitDocument,
    options
  );
}
export function useListSavedUnitLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListSavedUnitQuery,
    ListSavedUnitQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListSavedUnitQuery, ListSavedUnitQueryVariables>(
    ListSavedUnitDocument,
    options
  );
}
export type ListSavedUnitQueryHookResult = ReturnType<
  typeof useListSavedUnitQuery
>;
export type ListSavedUnitLazyQueryHookResult = ReturnType<
  typeof useListSavedUnitLazyQuery
>;
export type ListSavedUnitQueryResult = Apollo.QueryResult<
  ListSavedUnitQuery,
  ListSavedUnitQueryVariables
>;
export const ListViews360Document = gql`
  query ListViews360($input: ListViews360Input!) {
    listViews360(input: $input) {
      id
      name
      description
      mediaId
      image {
        thumbnailSrc
        fullImageSrc
      }
      scenes {
        id
        name
        description
        left
        top
        horizontalDegrees
        verticalDegrees
      }
    }
  }
`;

/**
 * __useListViews360Query__
 *
 * To run a query within a React component, call `useListViews360Query` and pass it any options that fit your needs.
 * When your component renders, `useListViews360Query` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListViews360Query({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useListViews360Query(
  baseOptions: Apollo.QueryHookOptions<
    ListViews360Query,
    ListViews360QueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListViews360Query, ListViews360QueryVariables>(
    ListViews360Document,
    options
  );
}
export function useListViews360LazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListViews360Query,
    ListViews360QueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListViews360Query, ListViews360QueryVariables>(
    ListViews360Document,
    options
  );
}
export type ListViews360QueryHookResult = ReturnType<
  typeof useListViews360Query
>;
export type ListViews360LazyQueryHookResult = ReturnType<
  typeof useListViews360LazyQuery
>;
export type ListViews360QueryResult = Apollo.QueryResult<
  ListViews360Query,
  ListViews360QueryVariables
>;
export const LoginWithPinDocument = gql`
  mutation LoginWithPin(
    $applicationId: String!
    $userId: String!
    $pin: String!
  ) {
    loginWithPin(applicationId: $applicationId, userId: $userId, pin: $pin) {
      __typename
      ... on LoginSuccess {
        token
      }
      ... on LoginError {
        error
        message
      }
    }
  }
`;
export type LoginWithPinMutationFn = Apollo.MutationFunction<
  LoginWithPinMutation,
  LoginWithPinMutationVariables
>;

/**
 * __useLoginWithPinMutation__
 *
 * To run a mutation, you first call `useLoginWithPinMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginWithPinMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginWithPinMutation, { data, loading, error }] = useLoginWithPinMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      userId: // value for 'userId'
 *      pin: // value for 'pin'
 *   },
 * });
 */
export function useLoginWithPinMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginWithPinMutation,
    LoginWithPinMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    LoginWithPinMutation,
    LoginWithPinMutationVariables
  >(LoginWithPinDocument, options);
}
export type LoginWithPinMutationHookResult = ReturnType<
  typeof useLoginWithPinMutation
>;
export type LoginWithPinMutationResult =
  Apollo.MutationResult<LoginWithPinMutation>;
export type LoginWithPinMutationOptions = Apollo.BaseMutationOptions<
  LoginWithPinMutation,
  LoginWithPinMutationVariables
>;
export const QueryClientsDocument = gql`
  query QueryClients($applicationId: String!, $agentId: String!) {
    agent(applicationId: $applicationId, id: $agentId) {
      id
      clients {
        id
        firstName
        lastName
        email
        agentId
        applicationId
        phone
        company
        street
        city
        country
        state
        firstVisit
        hearAboutUs
      }
    }
  }
`;

/**
 * __useQueryClientsQuery__
 *
 * To run a query within a React component, call `useQueryClientsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryClientsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryClientsQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      agentId: // value for 'agentId'
 *   },
 * });
 */
export function useQueryClientsQuery(
  baseOptions: Apollo.QueryHookOptions<
    QueryClientsQuery,
    QueryClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<QueryClientsQuery, QueryClientsQueryVariables>(
    QueryClientsDocument,
    options
  );
}
export function useQueryClientsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QueryClientsQuery,
    QueryClientsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<QueryClientsQuery, QueryClientsQueryVariables>(
    QueryClientsDocument,
    options
  );
}
export type QueryClientsQueryHookResult = ReturnType<
  typeof useQueryClientsQuery
>;
export type QueryClientsLazyQueryHookResult = ReturnType<
  typeof useQueryClientsLazyQuery
>;
export type QueryClientsQueryResult = Apollo.QueryResult<
  QueryClientsQuery,
  QueryClientsQueryVariables
>;
export const QueryPropertyDocument = gql`
  query QueryProperty($applicationId: String!, $id: String!) {
    property(applicationId: $applicationId, id: $id) {
      id
      name
      image
      components {
        id
        name
        address {
          addressLine1
          addressLine2
          city
          province
          postalCode
          countryCode
          region
        }
        unitModels {
          id
          name
          bedrooms
          halfBedrooms
          bathrooms
          halfBathrooms
          interiorArea
          exteriorArea
        }
        units {
          id
          name
          unitModelId
          salesStatus
          unitViews
          pricingInternal
          pricingExternal
          floor {
            id
            name
            keyPlan {
              name
              media
              minimap {
                svgUrl
                unitModelGroups {
                  groupId
                  externalIds
                }
              }
            }
          }
          featureCollections {
            name
            features
          }
          sage {
            customAttributes {
              name
              value
            }
          }
        }
        floors {
          id
          name
        }
        keyPlans {
          id
          name
          media
          minimap {
            svgUrl
            unitModelGroups {
              groupId
              externalIds
            }
          }
        }
        amenities {
          id
          name
          description
        }
        orbitReels {
          id
          label
          colorMap {
            color
            label
            status
            currentUnit
          }
        }
        pointsOfInterestCollections {
          id
          name
          points {
            name
            color
          }
        }
        controlCategories {
          id
          name
          enableCommand
          disableCommand
        }
      }
      amenities {
        id
        name
        description
      }
      orbitReels {
        id
        label
      }
      controlCategories {
        id
        name
        enableCommand
        disableCommand
      }
    }
  }
`;

/**
 * __useQueryPropertyQuery__
 *
 * To run a query within a React component, call `useQueryPropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryPropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryPropertyQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      id: // value for 'id'
 *   },
 * });
 */
export function useQueryPropertyQuery(
  baseOptions: Apollo.QueryHookOptions<
    QueryPropertyQuery,
    QueryPropertyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<QueryPropertyQuery, QueryPropertyQueryVariables>(
    QueryPropertyDocument,
    options
  );
}
export function useQueryPropertyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QueryPropertyQuery,
    QueryPropertyQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<QueryPropertyQuery, QueryPropertyQueryVariables>(
    QueryPropertyDocument,
    options
  );
}
export type QueryPropertyQueryHookResult = ReturnType<
  typeof useQueryPropertyQuery
>;
export type QueryPropertyLazyQueryHookResult = ReturnType<
  typeof useQueryPropertyLazyQuery
>;
export type QueryPropertyQueryResult = Apollo.QueryResult<
  QueryPropertyQuery,
  QueryPropertyQueryVariables
>;
export const SendShareUnitEmailDocument = gql`
  mutation SendShareUnitEmail(
    $applicationId: String!
    $input: SendShareUnitEmailInput!
  ) {
    sendShareUnitEmail(applicationId: $applicationId, input: $input) {
      success
      message
    }
  }
`;
export type SendShareUnitEmailMutationFn = Apollo.MutationFunction<
  SendShareUnitEmailMutation,
  SendShareUnitEmailMutationVariables
>;

/**
 * __useSendShareUnitEmailMutation__
 *
 * To run a mutation, you first call `useSendShareUnitEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendShareUnitEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendShareUnitEmailMutation, { data, loading, error }] = useSendShareUnitEmailMutation({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSendShareUnitEmailMutation(
  baseOptions?: Apollo.MutationHookOptions<
    SendShareUnitEmailMutation,
    SendShareUnitEmailMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    SendShareUnitEmailMutation,
    SendShareUnitEmailMutationVariables
  >(SendShareUnitEmailDocument, options);
}
export type SendShareUnitEmailMutationHookResult = ReturnType<
  typeof useSendShareUnitEmailMutation
>;
export type SendShareUnitEmailMutationResult =
  Apollo.MutationResult<SendShareUnitEmailMutation>;
export type SendShareUnitEmailMutationOptions = Apollo.BaseMutationOptions<
  SendShareUnitEmailMutation,
  SendShareUnitEmailMutationVariables
>;
export const UpdateClientDocument = gql`
  mutation UpdateClient($id: String!, $input: ClientInput!) {
    updateClient(id: $id, input: $input) {
      id
      firstName
      lastName
      email
      agentId
      applicationId
      brokerId
      phone
      company
      street
      city
      country
      state
      firstVisit
      hearAboutUs
      savedUnits {
        id
        userId
        unitId
        propertyId
        componentId
        applicationId
      }
    }
  }
`;
export type UpdateClientMutationFn = Apollo.MutationFunction<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;

/**
 * __useUpdateClientMutation__
 *
 * To run a mutation, you first call `useUpdateClientMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateClientMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateClientMutation, { data, loading, error }] = useUpdateClientMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateClientMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateClientMutation,
    UpdateClientMutationVariables
  >(UpdateClientDocument, options);
}
export type UpdateClientMutationHookResult = ReturnType<
  typeof useUpdateClientMutation
>;
export type UpdateClientMutationResult =
  Apollo.MutationResult<UpdateClientMutation>;
export type UpdateClientMutationOptions = Apollo.BaseMutationOptions<
  UpdateClientMutation,
  UpdateClientMutationVariables
>;
