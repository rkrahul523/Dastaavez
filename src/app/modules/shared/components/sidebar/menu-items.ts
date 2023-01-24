import { RouteInfo } from './sidebar.metadata';
import { ROUTE_PATH } from '../../models/route-path';

export const ROUTES: RouteInfo[] = [
 
  {
    path:  `${ROUTE_PATH.DASHBOARD}`,
    title: 'Dashboard',
    icon: 'bi bi-speedometer2',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path:  `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.TRACK_FILE}`,
    title: 'Track File',
    icon: 'bi bi-bell',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.CREATE_FILE}`,
    title: 'Create File',
    icon: 'bi bi-pencil-square',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.RECEIVE_FILE}`,
    title: 'Receive File',
    icon: 'bi bi-file-text',
    class: '',
    extralink: false,
    submenu: []
  },
  // {
  //   path: '/component/card',
  //   title: 'Card',
  //   icon: 'bi bi-card-text',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/dropdown',
  //   title: 'Dropdown',
  //   icon: 'bi bi-menu-app',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/pagination',
  //   title: 'Pagination',
  //   icon: 'bi bi-dice-1',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/nav',
  //   title: 'Nav',
  //   icon: 'bi bi-pause-btn',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  // {
  //   path: '/component/table',
  //   title: 'Table',
  //   icon: 'bi bi-layout-split',
  //   class: '',
  //   extralink: false,
  //   submenu: []
  // },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  }
];
