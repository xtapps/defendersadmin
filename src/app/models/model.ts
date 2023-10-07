export type Root = IApiRes[]

export interface IApiRes {
  properties: Property[]
  totalRecords: number
  title: string
}

export interface Property {
  locationName: string
  images: string[]
  appleIcon: string
  androidIcon: string
  corpName: string
  propertyType: string
  appSection: string
  featured: boolean
  androidURL: string
  appleURL: string
  address1: string
  address2: string
  county: string
  city: string
  state: string
  country: string
  zip: string
  phone: string
  website: string[]
  email: string
  localContact: string
  franchiseTag: string
  umbrellaTag: string
  licenseNumber: string
  isVetOwned: boolean
  orgType: string
  description: string
  discount: string
  discountDisclaimer: string
  groupCode: string
  primaryCategory: string
  secondaryCategory: string
  tags: string[]
  cardToken: string
  subscriptionID: string
  subscriptionCost: any
  subscriptionPaid: boolean
  loc: number[]
  lat: number
  lon: number
  distance: number
  locationCompany: string
  deleted: boolean
  locationActive: boolean
  locationType: string
  _id: string
  subStart: string
  subEnd: string
  updatedOn: string
  deletedDate: string
  createdOn: string
  __v: number
}
