import React from 'react';

import { Canvas } from '@/components/canvas';
import { domains } from '@/components/canvas/initialData';

const AnalyticsPage = () => (
  <div>
    <Canvas nodes={domains} />
  </div>
);

export default AnalyticsPage;