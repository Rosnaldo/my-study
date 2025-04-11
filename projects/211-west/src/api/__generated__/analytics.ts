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
  JSONObject: any;
  Void: any;
};

export type CreateLogInput = {
  applicationId: Scalars['String'];
  eventType: Scalars['String'];
  agentId: Scalars['String'];
  clientId?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
  displayName?: InputMaybe<Scalars['String']>;
};

export type CreateLogListingInput = {
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  id: Scalars['String'];
  status: ListingStatusType;
  unitName: Scalars['String'];
  propertyName: Scalars['String'];
  listPrice: Scalars['Int'];
  newListing: Scalars['Boolean'];
};

export type CreateSageLogInput = {
  applicationId: Scalars['String'];
  eventType: EventType;
  agentId: Scalars['String'];
  clientId: Scalars['String'];
  pageVisitStartedEventParams?: InputMaybe<PageVisitPayload>;
  pageVisitEndedEventParams?: InputMaybe<PageVisitPayload>;
  pageVisitTimeLogEventParams?: InputMaybe<TimeLogPayload>;
  emailSentEventParams?: InputMaybe<EmailSentPayload>;
  salesCenterVisitStartedEventParams?: InputMaybe<Scalars['Void']>;
  salesCenterVisitEndedEventParams?: InputMaybe<Scalars['Void']>;
  customerPortalVisitStartedEventParams?: InputMaybe<Scalars['Void']>;
  customerPortalVisitEndedEventParams?: InputMaybe<Scalars['Void']>;
};

export type EmailSentPayload = {
  units: Array<EmailSentPayloadUnit>;
};

export type EmailSentPayloadUnit = {
  id: Scalars['String'];
  name: Scalars['String'];
};

export enum EventType {
  EmailSent = 'EMAIL_SENT',
  SalesCenterVisitStarted = 'SALES_CENTER_VISIT_STARTED',
  SalesCenterVisitEnded = 'SALES_CENTER_VISIT_ENDED',
  CustomerPortalVisitStarted = 'CUSTOMER_PORTAL_VISIT_STARTED',
  CustomerPortalVisitEnded = 'CUSTOMER_PORTAL_VISIT_ENDED',
  PageVisitStarted = 'PAGE_VISIT_STARTED',
  PageVisitEnded = 'PAGE_VISIT_ENDED',
  PageVisitTimeLog = 'PAGE_VISIT_TIME_LOG'
}

export enum ListingStatusType {
  Available = 'AVAILABLE',
  Unavailable = 'UNAVAILABLE',
  Preview = 'PREVIEW',
  Sold = 'SOLD',
  Pending = 'PENDING'
}

export type LogEvent = {
  __typename?: 'LogEvent';
  applicationId: Scalars['String'];
  eventType: Scalars['String'];
  agentId: Scalars['String'];
  clientId?: Maybe<Scalars['String']>;
  uri?: Maybe<Scalars['String']>;
  timestamp: Scalars['String'];
  displayName?: Maybe<Scalars['String']>;
  logs: Array<LogEvent>;
};

export type LogEventLogsArgs = {
  eventType: Scalars['String'];
  uri?: InputMaybe<Scalars['String']>;
  input?: InputMaybe<QuerySubLogsInput>;
};

export type LogListing = {
  __typename?: 'LogListing';
  propertyId: Scalars['String'];
  componentId: Scalars['String'];
  unitId: Scalars['String'];
  id: Scalars['String'];
  timestamp: Scalars['String'];
  status: ListingStatusType;
  unitName: Scalars['String'];
  propertyName: Scalars['String'];
  listPrice: Scalars['Int'];
  newListing?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  logEvent: LogEvent;
  logListing: LogListing;
  createSageLog?: Maybe<Scalars['Void']>;
};

export type MutationLogEventArgs = {
  input: CreateLogInput;
};

export type MutationLogListingArgs = {
  input: CreateLogListingInput;
};

export type MutationCreateSageLogArgs = {
  input: CreateSageLogInput;
};

export type PageVisitPayload = {
  url: Scalars['String'];
  timestamp: Scalars['String'];
  station?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  queryLogs: Array<LogEvent>;
  queryListingLogs: Array<LogListing>;
  querySageEventsByApplicationId: Array<SageLog>;
  queryClientSageEvents: Array<SageLog>;
};

export type QueryQueryLogsArgs = {
  eventType: Scalars['String'];
  input: QueryLogsInput;
};

export type QueryQueryListingLogsArgs = {
  input: QueryListingLogsInput;
};

export type QueryQuerySageEventsByApplicationIdArgs = {
  applicationId: Scalars['String'];
};

export type QueryQueryClientSageEventsArgs = {
  input: QueryClientSageEventsInput;
};

export type QueryClientSageEventsInput = {
  applicationId: Scalars['String'];
  clientId: Scalars['String'];
};

export type QueryListingLogsInput = {
  propertyId?: InputMaybe<Scalars['String']>;
  componentId?: InputMaybe<Scalars['String']>;
  unitId?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<ListingStatusType>;
  startTime?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
};

export type QueryLogsInput = {
  applicationId: Scalars['String'];
  startTime?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  agentId?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type QuerySubLogsInput = {
  startTime?: InputMaybe<Scalars['String']>;
  endTime?: InputMaybe<Scalars['String']>;
  agentId?: InputMaybe<Scalars['String']>;
  clientId?: InputMaybe<Scalars['String']>;
  uri?: InputMaybe<Scalars['String']>;
};

export type SageLog = {
  __typename?: 'SageLog';
  applicationId: Scalars['String'];
  eventType: EventType;
  timestamp: Scalars['String'];
  agent: SageLogAgent;
  client?: Maybe<SageLogClient>;
  payload?: Maybe<Scalars['JSONObject']>;
};

export type SageLogAgent = {
  __typename?: 'SageLogAgent';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  image: Scalars['String'];
};

export type SageLogClient = {
  __typename?: 'SageLogClient';
  id: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  phone: Scalars['String'];
};

export type TimeLogPayload = {
  url: Scalars['String'];
  timespan: Scalars['String'];
  station?: InputMaybe<Scalars['String']>;
};

export type CreateSageLogMutationVariables = Exact<{
  input: CreateSageLogInput;
}>;

export type CreateSageLogMutation = {
  __typename?: 'Mutation';
  createSageLog?: any | null;
};

export type QueryClientSageEventsQueryVariables = Exact<{
  input: QueryClientSageEventsInput;
}>;

export type QueryClientSageEventsQuery = {
  __typename?: 'Query';
  queryClientSageEvents: Array<{
    __typename?: 'SageLog';
    eventType: EventType;
    timestamp: string;
    payload?: any | null;
  }>;
};

export type GetSageEventsByApplicationIdQueryVariables = Exact<{
  applicationId: Scalars['String'];
}>;

export type GetSageEventsByApplicationIdQuery = {
  __typename?: 'Query';
  querySageEventsByApplicationId: Array<{
    __typename?: 'SageLog';
    timestamp: string;
    eventType: EventType;
    payload?: any | null;
    client?: { __typename?: 'SageLogClient'; id: string } | null;
  }>;
};

export const CreateSageLogDocument = gql`
  mutation CreateSageLog($input: CreateSageLogInput!) {
    createSageLog(input: $input)
  }
`;
export type CreateSageLogMutationFn = Apollo.MutationFunction<
  CreateSageLogMutation,
  CreateSageLogMutationVariables
>;

/**
 * __useCreateSageLogMutation__
 *
 * To run a mutation, you first call `useCreateSageLogMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateSageLogMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createSageLogMutation, { data, loading, error }] = useCreateSageLogMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateSageLogMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateSageLogMutation,
    CreateSageLogMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateSageLogMutation,
    CreateSageLogMutationVariables
  >(CreateSageLogDocument, options);
}
export type CreateSageLogMutationHookResult = ReturnType<
  typeof useCreateSageLogMutation
>;
export type CreateSageLogMutationResult =
  Apollo.MutationResult<CreateSageLogMutation>;
export type CreateSageLogMutationOptions = Apollo.BaseMutationOptions<
  CreateSageLogMutation,
  CreateSageLogMutationVariables
>;
export const QueryClientSageEventsDocument = gql`
  query QueryClientSageEvents($input: QueryClientSageEventsInput!) {
    queryClientSageEvents(input: $input) {
      eventType
      timestamp
      payload
    }
  }
`;

/**
 * __useQueryClientSageEventsQuery__
 *
 * To run a query within a React component, call `useQueryClientSageEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useQueryClientSageEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQueryClientSageEventsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useQueryClientSageEventsQuery(
  baseOptions: Apollo.QueryHookOptions<
    QueryClientSageEventsQuery,
    QueryClientSageEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    QueryClientSageEventsQuery,
    QueryClientSageEventsQueryVariables
  >(QueryClientSageEventsDocument, options);
}
export function useQueryClientSageEventsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    QueryClientSageEventsQuery,
    QueryClientSageEventsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    QueryClientSageEventsQuery,
    QueryClientSageEventsQueryVariables
  >(QueryClientSageEventsDocument, options);
}
export type QueryClientSageEventsQueryHookResult = ReturnType<
  typeof useQueryClientSageEventsQuery
>;
export type QueryClientSageEventsLazyQueryHookResult = ReturnType<
  typeof useQueryClientSageEventsLazyQuery
>;
export type QueryClientSageEventsQueryResult = Apollo.QueryResult<
  QueryClientSageEventsQuery,
  QueryClientSageEventsQueryVariables
>;
export const GetSageEventsByApplicationIdDocument = gql`
  query GetSageEventsByApplicationId($applicationId: String!) {
    querySageEventsByApplicationId(applicationId: $applicationId) {
      timestamp
      client {
        id
      }
      eventType
      payload
    }
  }
`;

/**
 * __useGetSageEventsByApplicationIdQuery__
 *
 * To run a query within a React component, call `useGetSageEventsByApplicationIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSageEventsByApplicationIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSageEventsByApplicationIdQuery({
 *   variables: {
 *      applicationId: // value for 'applicationId'
 *   },
 * });
 */
export function useGetSageEventsByApplicationIdQuery(
  baseOptions: Apollo.QueryHookOptions<
    GetSageEventsByApplicationIdQuery,
    GetSageEventsByApplicationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<
    GetSageEventsByApplicationIdQuery,
    GetSageEventsByApplicationIdQueryVariables
  >(GetSageEventsByApplicationIdDocument, options);
}
export function useGetSageEventsByApplicationIdLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    GetSageEventsByApplicationIdQuery,
    GetSageEventsByApplicationIdQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<
    GetSageEventsByApplicationIdQuery,
    GetSageEventsByApplicationIdQueryVariables
  >(GetSageEventsByApplicationIdDocument, options);
}
export type GetSageEventsByApplicationIdQueryHookResult = ReturnType<
  typeof useGetSageEventsByApplicationIdQuery
>;
export type GetSageEventsByApplicationIdLazyQueryHookResult = ReturnType<
  typeof useGetSageEventsByApplicationIdLazyQuery
>;
export type GetSageEventsByApplicationIdQueryResult = Apollo.QueryResult<
  GetSageEventsByApplicationIdQuery,
  GetSageEventsByApplicationIdQueryVariables
>;
