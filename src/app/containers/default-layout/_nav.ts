import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    name: 'Dashboard',
    url: '/dashboard',
    iconComponent: { name: 'cil-speedometer' },
    badge: {
      color: '',
      text: ''
    }
  },
  // {
  //   title: true,
  //   name: 'Admin'
  // },
  {
    name: 'Companies',
    url: '/admin/home',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Locations',
    url: 'locations',
    iconComponent: { name: 'cil-location-pin' }
  },
  {
    name: 'Websites',
    url: 'websites',
    iconComponent: { name: 'cil-browser' }
  },
  {
    name: 'apps',
    url: 'Apps',
    iconComponent: { name: 'cil-apps' }
  },
  {
    name: 'Franchises',
    url: 'franchises',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Categories',
    url: 'categories',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Group Codes',
    url: 'group-code',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Defenders',
    url: 'defenders',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Admin Users',
    url: 'admin-users',
    iconComponent: { name: 'cil-user' }
  },
  // {
  //   title: true,
  //   name: 'Extras'
  // },
  {
    name: 'Pages',
    url: '/login',
    iconComponent: { name: 'cil-star' },
    children: [
      {
        name: 'Login',
        url: '/login'
      }
    ]
  },
];
