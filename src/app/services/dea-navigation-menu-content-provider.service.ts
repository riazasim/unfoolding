import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ObservableContentProvider } from '../models/content-provider.types';
import { NavigationMenuConfig } from '../models/navigation-menu.model';

@Injectable()
export class DeaNavigationMenuContentProviderService implements ObservableContentProvider<NavigationMenuConfig[]> {

  private readonly menuItemsConfig: NavigationMenuConfig[] = [
    {
      label: 'Dashboard',
      icon: 'tachometer-fast',
      destination: 'dashboard',
      activeOnSegment: 'dashboard',
      iconModifierClass: '',
      requiredRoles: []
    },
    {
      label: 'Users',
      icon: 'users',
      destination: 'users',
      activeOnSegment: 'users',
      iconModifierClass: '',
      requiredRoles: []
    },
    {
      label: 'Customers',
      icon: 'users',
      destination: 'customer',
      activeOnSegment: 'customer',
      iconModifierClass: '',
      requiredRoles: [],
    },
    {
      label: 'Usage',
      icon: 'chart-pie',
      destination: 'usage',
      activeOnSegment: 'usage',
      iconModifierClass: '',
      requiredRoles: []
    },
    {
      label: 'Billing',
      icon: 'dollar-sign',
      activeOnSegment: 'billing',
      iconModifierClass: '',
      requiredRoles: [],
      droprightMenuConfig: [
        {
          label: 'History',
          destination: `billing/history`,
          requiredRoles: []
        },
        {
          label: 'Profiles',
          destination: `billing/profiles`,
          requiredRoles: []
        },
        {
          label: 'Payment Methods',
          destination: `billing/payment-methods`,
          requiredRoles: []
        },
        {
          label: 'Products',
          destination: `billing/products`,
          requiredRoles: []
        },
        {
          label: 'Invoices',
          destination: `billing/invoices`,
          requiredRoles: []
        }
      ]
    },
  ];

  constructor() {}

  getContent(): Observable<NavigationMenuConfig[]> {
    return of(this.menuItemsConfig);
  }
}
