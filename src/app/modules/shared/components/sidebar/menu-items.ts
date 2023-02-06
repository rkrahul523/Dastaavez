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
  {
    path: `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.MANAGE_ROLES}`,
    title: 'Manage Roles',
    icon: 'bi bi-bank', 
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: `${ROUTE_PATH.DASHBOARD}/${ROUTE_PATH.MANAGE_USERS}`,
    title: 'Manage Users',
    icon: 'bi bi-people',
    class: '',
    extralink: false,
    submenu: []
  },
  {
    path: '/about',
    title: 'About',
    icon: 'bi bi-chat-square-text',
    class: '',
    extralink: false,
    submenu: []
  }
];
