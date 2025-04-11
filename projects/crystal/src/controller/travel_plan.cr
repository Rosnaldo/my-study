require "../helper/expand_helper"
require "../helper/optimize_helper"

class TravelPlanController
  @@expandHelper = ExpandHelper.new
  @@optimizeHelper = OptimizeHelper.new

  def initialize(repository : ITravelPlanRepository)
    @repository = repository
  end

  def all(is_expand : Bool, is_optimize : Bool) : Array(TravelPlanResponse) | Array(TravelPlan)
    resultSet = @repository.all()

    if resultSet.size === 0
      [] of TravelPlan
    else
      travel_stops = resultSet.map { |x| x.travel_stops }
        .reduce([] of Int32) { |acc, x| acc.concat(x) }
      
      if !is_optimize && !is_expand
        resultSet
      else
        hash = @@expandHelper.make_travel_stops_hash(travel_stops)
        travel_plan_expanded = resultSet.map { |x| TravelPlanExpand.new(hash, x.id, x.travel_stops) }
        travel_plan_expanded_ordered = is_optimize ? @@optimizeHelper.order_all(travel_plan_expanded) : travel_plan_expanded
  
        if is_expand
          Array(TravelPlanResponse).from_json(travel_plan_expanded_ordered.to_json)
        else
          travel_plan_expanded_ordered.map { |x| @@expandHelper.unexpand(x) }
        end
      end
    end
  end

  def one(id : Int32, is_expand : Bool, is_optimize : Bool) : TravelPlanResponse | TravelPlan
    resultSet = @repository.one(id)

    if resultSet.nil?
      raise Exception.new("Not found")
    else
      travel_stops = resultSet.travel_stops
      if !is_optimize && !is_expand
        resultSet
      else
        hash = @@expandHelper.make_travel_stops_hash(travel_stops)
        travel_plan_expanded = TravelPlanExpand.new(hash, id, travel_stops)
        travel_plan_expanded_ordered = is_optimize ? @@optimizeHelper.order(travel_plan_expanded) : travel_plan_expanded
        
        if is_expand
          TravelPlanResponse.from_json(travel_plan_expanded_ordered.to_json)
        else
          @@expandHelper.unexpand(travel_plan_expanded_ordered)
        end
      end
    end
  end

  def append(id : Int32, new_travel_stops : Array(Int32))
    resultSet = @repository.one(id)

    if resultSet.nil?
      raise Exception.new("Not found")
    else
      travel_stops = resultSet.travel_stops
      set = Set.new [] of Int32
      set.concat(travel_stops)
      set.concat(new_travel_stops)
      @repository.update(set.to_a, id)
    end
  end

  def create(travel_stops : Array(Int32)) : TravelPlan
    travel_stops = Array(Int32).from_json(travel_stops.to_json)
    @repository.create(travel_stops)
  end

  def update(travel_stops : Array(Int32), id : Int32) : TravelPlan
    resultSet = @repository.one(id)
    if resultSet.nil?
      raise Exception.new("Not found")
    end
    travel_stops = Array(Int32).from_json(travel_stops.to_s)
    @repository.update(travel_stops, id)
  end

  def delete(id : Int32)
    resultSet = @repository.one(id)
    if resultSet.nil?
      raise Exception.new("Not found")
    end
    @repository.delete(id)
  end
end
