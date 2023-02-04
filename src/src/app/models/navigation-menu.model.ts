export type Nullable<T> = T | null;

export interface DroprightMenuConfig {
  label: string;
  destination: string;
  onClick?: () => void;
  requiredRoles: string[];
}

export interface NavigationMenuConfig {
  icon: any;
  label: string;
  destination?: string;
  iconModifierClass: string,
  activeOnSegment: string,
  onActive?: () => void;
  droprightMenuConfig?: any[],
  requiredRoles: string[];
}
