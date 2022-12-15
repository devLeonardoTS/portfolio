export type Nullable<T> = { [K in keyof T]: T[K] | null }
export type DeepNullable<T> = { [K in keyof T]: DeepNullable<T[K]> | null; }

export type Optional<T> = { [K in keyof T]?: T[K] }
export type DeepOptional<T> = { [K in keyof T]?: DeepNullable<T[K]>; }