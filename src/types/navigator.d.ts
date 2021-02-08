import React from 'react';

export interface NavigatorScreen<T> {
  name: T;
  component: React.ComponentType<any>;
  options: any;
  listeners?: any;
  requiresAuth?: boolean;
}
