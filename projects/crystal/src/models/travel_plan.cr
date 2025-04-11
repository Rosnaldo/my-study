class TravelPlanModel < Jennifer::Model::Base
  table_name :travel_plans

  mapping(
    id: Primary64,
    travel_stops: Array(Int32),
  )
end
