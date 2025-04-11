require "../fake_data"

class MockNilTravelPlanRepository < ITravelPlanRepository
  @@fake = FakeData.new

  def all : Array(TravelPlan)
    @@fake.make_travel_plans
  end

  def create(travel_stops : Array(Int32)) : TravelPlan
    @@fake.make_travel_stop
  end

  def one(id : Int32) : TravelPlan | Nil
    nil
  end

  def update(travel_stops : Array(Int32), id : Int32) : TravelPlan
    @@fake.make_travel_stop
  end

  def delete(id : Int32)
    Nil
  end
end