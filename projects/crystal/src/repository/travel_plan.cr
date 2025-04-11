require "../serializable/index"
require "./itravel_plan"

class TravelPlanRepository < ITravelPlanRepository
  def all : Array(TravelPlan)
    t = TravelPlanModel.all().to_json
    Array(TravelPlan).from_json(t)
  end

  def create(travel_stops : Array(Int32)) : TravelPlan
    t = TravelPlanModel.new({ travel_stops: travel_stops })
    t.save
    TravelPlan.from_json(t.to_json)
  end

  def one(id : Int32) : TravelPlan | Nil
    t = TravelPlanModel.find(id)
    if t.nil?
      nil
    else
      TravelPlan.from_json(t.to_json)
    end
  end

  def update(travel_stops : Array(Int32), id : Int32) : TravelPlan
    t = TravelPlanModel.find!(id)
    t.travel_stops = travel_stops
    t.save
    TravelPlan.from_json(t.to_json)
  end

  def delete(id : Int32)
    TravelPlanModel.delete(id)
  end
end
