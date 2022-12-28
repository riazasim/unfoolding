import { DeaNavigationModel } from "src/app/models/navigation.type";


export function deaCurrentLocationMapFactory(navigation: DeaNavigationModel): Map<string, string> {
  const adminNavRoot = navigation.admin;
  return new Map<string, string>([
    [adminNavRoot.pages.dashboard, 'Dashboard'],
    [adminNavRoot.pages.usage, 'Usage'],
    [adminNavRoot.pages.users, 'Users'],
    [adminNavRoot.pages.billing, 'Billing'],
    [adminNavRoot.pages.customer, 'Customers']
  ]);
}
