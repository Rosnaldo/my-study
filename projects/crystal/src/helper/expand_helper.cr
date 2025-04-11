require "http/client"
require "../serializable/index"

class ExpandHelper
  def make_travel_stops_hash(travel_stops : Array(Int32)) : Hash(Int32, TravelStop)
    locations = make_locations(travel_stops)
    response = HTTP::Client.get "https://rickandmortyapi.com/api/location/#{locations.to_s}"
    hash = Hash(Int32, TravelStop).new
    if locations.size == 1
      elem = TravelStop.from_json(response.body)
      hash[elem.id] = elem
    else
      Array(TravelStop).from_json(response.body) do |elem|
        hash[elem.id] = elem
      end
    end
    hash
  end

  def make_locations(travel_stops : Array(Int32)) : String
    set = Set.new [] of Int32
    set.concat(travel_stops)
    if travel_stops.size === 1
      travel_stops[0].to_s
    else
      if travel_stops.size === 0
        ""
      else
        set.to_a.map { |x| x.to_s }.reduce { |acc, n| "#{acc},#{n}" }
      end
    end
  end

  def unexpand(travelPlanExpand : TravelPlanExpand) : TravelPlan
    TravelPlan.new(travelPlanExpand.id, travelPlanExpand.travel_stops.map { |x| x.id })
  end

  def is(obj) : Bool
    if obj.has_key?("expand")
      obj["expand"] == "true"
    else
      false
    end
  end
end
