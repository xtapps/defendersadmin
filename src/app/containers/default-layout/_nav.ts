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
    name: 'Partners',
    url: '/admin/home',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Locations',
    url: '/admin/location',
    iconComponent: { name: 'cil-location-pin' }
  },
  {
    name: 'Websites',
    url: '/admin/websites',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Apps',
    url: '/admin/apps',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Franchises',
    url: '/admin/franchises',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Categories',
    url: '/admin/categories',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Group Codes',
    url: '/admin/group-codes',
    iconComponent: { name: 'cil-home' }
  },
  {
    name: 'Defenders',
    url: '/admin/defenders',
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
