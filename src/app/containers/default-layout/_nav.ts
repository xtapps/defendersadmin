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
  {
    title: true,
    name: 'Opportunities'
  },
  {
    name: 'Job Boards',
    url: '/admin/job-boards',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Job Opportunities',
    url: '/admin/job-opportunities',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Business Opportunities',
    url: '/admin/business-opportunities',
    iconComponent: { name: 'cil-user' }
  },
  {
    title: true,
    name: 'Non Profits'
  },
  {
    name: 'Military',
    url: '/non-profits/military',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'First Responder',
    url: '/non-profits/first-responder',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Chaplain',
    url: '/non-profits/chaplain',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Other',
    url: '/non-profits/other',
    iconComponent: { name: 'cil-user' }
  },
  {
    title: true,
    name: 'Kids Corner'
  },
  {
    name: 'Games',
    url: '',
    iconComponent: { name: 'cil-user' }
  },
  {
    name: 'Books Plus',
    url: '',
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
