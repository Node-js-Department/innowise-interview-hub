export enum EEntities {
  User = 'User',
}

export type TEntityType<S> = {
  [K in keyof S]: S[K] extends { type: 'string' } ? string
    : S[K] extends { type: 'number' } ? number
      : S[K] extends { type: 'boolean' } ? boolean
        : S[K] extends { type: 'uuid' } ? string
          : S[K] extends { type: 'datetime' } ? string
            : unknown;
};
