import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type ConfirmEmailResponse = {
  __typename?: 'ConfirmEmailResponse';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type ConfirmTokenResponse = {
  __typename?: 'ConfirmTokenResponse';
  error?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  error?: Maybe<Scalars['String']>;
  success?: Maybe<Scalars['Boolean']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  confirmEmail: ConfirmEmailResponse;
  confirmToken: ConfirmTokenResponse;
  login: LoginResponse;
  logout: Scalars['Boolean'];
  register: RegisterResponse;
};


export type MutationConfirmEmailArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
};


export type MutationRegisterArgs = {
  confirmPassword: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  testRoute: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  error?: Maybe<Scalars['String']>;
  success: Scalars['Boolean'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  username: Scalars['String'];
};

export type ConfirmEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type ConfirmEmailMutation = { __typename?: 'Mutation', confirmEmail: { __typename?: 'ConfirmEmailResponse', success?: boolean | null | undefined, error?: string | null | undefined } };

export type ConfirmTokenMutationVariables = Exact<{ [key: string]: never; }>;


export type ConfirmTokenMutation = { __typename?: 'Mutation', confirmToken: { __typename?: 'ConfirmTokenResponse', error?: string | null | undefined, user?: { __typename?: 'User', username: string, email: string } | null | undefined } };

export type HelloQueryVariables = Exact<{ [key: string]: never; }>;


export type HelloQuery = { __typename?: 'Query', hello: string };

export type LoginMutationVariables = Exact<{
  emailOrUsername: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = { __typename?: 'Mutation', login: { __typename?: 'LoginResponse', success?: boolean | null | undefined, error?: string | null | undefined } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RegisterMutationVariables = Exact<{
  email: Scalars['String'];
  username: Scalars['String'];
  password: Scalars['String'];
  confirmPassword: Scalars['String'];
}>;


export type RegisterMutation = { __typename?: 'Mutation', register: { __typename?: 'RegisterResponse', success: boolean, error?: string | null | undefined } };


export const ConfirmEmailDocument = gql`
    mutation ConfirmEmail($token: String!) {
  confirmEmail(token: $token) {
    success
    error
  }
}
    `;

export function useConfirmEmailMutation() {
  return Urql.useMutation<ConfirmEmailMutation, ConfirmEmailMutationVariables>(ConfirmEmailDocument);
};
export const ConfirmTokenDocument = gql`
    mutation ConfirmToken {
  confirmToken {
    user {
      username
      email
    }
    error
  }
}
    `;

export function useConfirmTokenMutation() {
  return Urql.useMutation<ConfirmTokenMutation, ConfirmTokenMutationVariables>(ConfirmTokenDocument);
};
export const HelloDocument = gql`
    query Hello {
  hello
}
    `;

export function useHelloQuery(options: Omit<Urql.UseQueryArgs<HelloQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<HelloQuery>({ query: HelloDocument, ...options });
};
export const LoginDocument = gql`
    mutation Login($emailOrUsername: String!, $password: String!) {
  login(emailOrUsername: $emailOrUsername, password: $password) {
    success
    error
  }
}
    `;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($email: String!, $username: String!, $password: String!, $confirmPassword: String!) {
  register(
    email: $email
    username: $username
    password: $password
    confirmPassword: $confirmPassword
  ) {
    success
    error
  }
}
    `;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};