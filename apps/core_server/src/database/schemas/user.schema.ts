import Neode from 'neode';

import { TEntityType } from '../model';

export const UserSchema: Neode.SchemaObject = {
  id: { type: 'uuid', primary: true, required: true },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true },
  createdAt: { type: 'datetime', default: () => new Date().toISOString() },
  updatedAt: { type: 'datetime', default: () => new Date().toISOString() },
};

export type TUser = TEntityType<typeof UserSchema>;
