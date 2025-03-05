import * as React from 'react';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';

type TBreadcrumbProps = {
  breadcrumbItems: Array<{ title: string, url: string }>,
};

export const BreadcrumbHeader = ({ breadcrumbItems }: TBreadcrumbProps) => (
  <Breadcrumb>
    <BreadcrumbList>
      {breadcrumbItems.map((item, index) => (
        <React.Fragment key={item.title}>
          <BreadcrumbItem>
            <BreadcrumbLink href={item.url}>{item.title}</BreadcrumbLink>
          </BreadcrumbItem>
          {index < breadcrumbItems.length - 1 && <BreadcrumbSeparator />}
        </React.Fragment>
      ))}
    </BreadcrumbList>
  </Breadcrumb>
);
