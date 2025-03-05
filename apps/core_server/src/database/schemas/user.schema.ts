import Neode from 'neode';

import { TEntityType } from '../model';

import { EUserRole } from '@/common/models';

export const UserSchema: Neode.SchemaObject = {
  id: { type: 'uuid', primary: true, required: true },
  name: { type: 'string', required: true },
  email: { type: 'string', required: true, unique: true },
  role: { type: 'string', required: true, default: EUserRole.Candidate },
  technology: { type: 'string', required: true },

  interviews: {
    type: 'relationship',
    target: 'Interview',
    relationship: 'PARTICIPATES_IN',
    direction: 'out',
    eager: true,
  },

  createdAt: { type: 'datetime', default: () => new Date().toISOString() },
  updatedAt: { type: 'datetime', default: () => new Date().toISOString() },
};

export type TUser = TEntityType<typeof UserSchema>;
