abstract class ITravelPlanRepository
  abstract def all : Array(TravelPlan)

  abstract def create(travel_stops : Array(Int32)) : TravelPlan

  abstract def one(id : Int32) : TravelPlan | Nil

  abstract def update(travel_stops : Array(Int32), id : Int32) : TravelPlan

  abstract def delete(id : Int32)
end
