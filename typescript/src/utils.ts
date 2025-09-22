// Check if two types are structuraly the same
export type Equal<T, U> =
(<V>() => V extends T ?
1 : 2) extends
(<V>() => V extends U ?
1 : 2) ? true : false

// Check equality between keys
export type SameKeys<T, U> = keyof T extends keyof U
? keyof U extends keyof T
  ? true : false
  : false

// Check if they are mutually attributable
export type SameShape<T, U> = T extends U ? (U extends T ? true : false) : false

// Use never to throw error in compile time
export type Expect<T extends true> = T

// get only keys non function from class
export type NonFunctionKeys<T> = {
  [K in keyof T]: T[K] extends Function ?
  never : K
}[keyof T]

// get props from NonFunctionKeys
export type NonFunctionProps<T> = Pick<T, NonFunctionKeys<T>>

export type OmitId<T> = Omit<T, 'id'>

export type Merge<T, U> = {
  [K in keyof T | keyof U]: K extends keyof U
  ? U[K]
  : K extends keyof T
  ? T[K]
  : never
}
