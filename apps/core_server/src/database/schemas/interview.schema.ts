import Neode from 'neode';

import { TEntityType } from '../model';

import { ECandidateLevel } from '@/common/models';

export const InterviewSchema: Neode.SchemaObject = {
  id: { type: 'uuid', primary: true, required: true },
  score: { type: 'number' },
  interviewDate: { type: 'datetime' },
  followUpCount: { type: 'number' },
  questionCount: { type: 'number' },
  time: { type: 'datetime' },
  level: { type: 'string', required: true, default: ECandidateLevel.Intern },

  participants: {
    type: 'relationship',
    target: 'User',
    relationship: 'PARTICIPATES_IN',
    direction: 'out',
    eager: true,
  },

  createdAt: { type: 'datetime', default: () => new Date().toISOString() },
  updatedAt: { type: 'datetime', default: () => new Date().toISOString() },
};

export type TInterview= TEntityType<typeof InterviewSchema>;
