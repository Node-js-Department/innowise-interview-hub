import React from 'react';

import { Canvas } from '@/components/canvas';
import { domains } from '@/components/canvas/initialData';

const AnalyticsPage = () => (
  <Canvas nodes={domains} />
);

export default AnalyticsPage;