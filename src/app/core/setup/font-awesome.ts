import { FaConfig, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBell,
  faBuilding,
  faCameraAlt,
  faCity,
  faCog,
  faDollarSign,
  faDownload,
  faEnvelope,
  faEye,
  faEyeSlash,
  faListUl,
  faLock,
  faMapMarkerAlt,
  faPencilAlt,
  faPhone,
  faSearch,
  faSignOut,
  faTachometerFast,
  faTicket,
  faTimes,
  faTrashAlt,
  faUser,
  faUsers,
  faChartPie,
  faCalendar,
} from '@fortawesome/pro-regular-svg-icons';

import { faTh } from '@fortawesome/pro-solid-svg-icons';

const solidIcons: IconDefinition[] = [
  faTh
];

const regularIcons: IconDefinition[] = [
  faUser, faTachometerFast, faCog,faChartPie,faCalendar,
  faPhone, faBuilding, faSignOut,
  faEnvelope, faUsers, faTimes,
  faLock, faTicket, faTrashAlt,
  faEye, faDollarSign, faDownload,
  faEyeSlash, faBell, faSearch,
  faListUl, faMapMarkerAlt, faPencilAlt,
  faCameraAlt, faCity
];

export function setupFontAwesome(config: FaConfig, library: FaIconLibrary): void {
  config.defaultPrefix = 'far';
  library.addIcons(...regularIcons, ...solidIcons);
}
