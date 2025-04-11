require "json"
require "db"

class TravelStop
  include JSON::Serializable
    property id : Int32
    property name : String
    property type : String
    property dimension : String
    property residents : Array(String)
end

class TravelStopUnexpanded
  include JSON::Serializable
    property id : Int32
    property name : String
    property type : String
    property dimension : String
end

class TravelPlanResponse
  include JSON::Serializable
    property id : Int32
    property travel_stops : Array(TravelStopUnexpanded)

    def initialize(hash : Hash(Int32, TravelStop), id : Int32, travel_stops_not_expanded : Array(Int32))
      @id = id
      @travel_stops = travel_stops_not_expanded.map { |y| TravelStopUnexpanded.from_json(hash[y].to_json) }
    end
end

class TravelPlanExpand
  include JSON::Serializable
    property id : Int32
    property travel_stops : Array(TravelStop)

    def initialize(hash : Hash(Int32, TravelStop), id : Int32, travel_stops_not_expanded : Array(Int32))
      @id = id
      @travel_stops = travel_stops_not_expanded.map { |y| hash[y] }
    end
end


class TravelPlan
  include JSON::Serializable
  ::DB.mapping({
    id: Int32,
    travel_stops: Array(Int32),
  })

  def initialize(@id : Int32, @travel_stops : Array(Int32))
  end
end
