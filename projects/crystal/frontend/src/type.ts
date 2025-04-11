export type TravelPlanType = {
  id: Number
  travel_stops: Number[],
}

export type TravelStopType = {
  id: Number
  name: String
  type: String
  dimension: String
  residents: String[]
}

export enum UpdateCreateModalEnum {
  Update = 'Update',
  Create = 'Create',
}
