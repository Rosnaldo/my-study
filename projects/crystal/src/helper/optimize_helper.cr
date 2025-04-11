require "../serializable/index"

class OptimizeHelper
  def make_average_residents_by_dimension_hash(travel_plan_expand : TravelPlanExpand) : Hash(String, { total: Int32, average: Float64 })
    average_residents_by_dimension = Hash(String, { total: Int32, average: Float64 }).new

    travel_plan_expand.travel_stops.each do |elem|
      dimension = elem.dimension
      residents = elem.residents.size

      unless average_residents_by_dimension.has_key?(dimension)
        average_residents_by_dimension[dimension] = {
          total: 1,
          average: Float64.new(residents),
        }
      else
        average = average_residents_by_dimension[dimension]["average"]
        total = average_residents_by_dimension[dimension]["total"]

        average_residents_by_dimension[dimension] = {
          total: average_residents_by_dimension[dimension]["total"] + 1,
          average: Float64.new(average * total / (total + 1)),
        }
      end
    end

    average_residents_by_dimension
  end

  def order_travel_stops(travel_stops : Array(TravelStop), average_residents_by_dimension : Hash(String, { total: Int32, average: Float64 })) : Array(TravelStop)
    travel_stops.sort! do |x,y|
      dimension_x = x.dimension
      dimension_y = y.dimension
      residents_x = x.residents.size
      residents_y = y.residents.size
      average_x = average_residents_by_dimension[dimension_x]["average"]
      average_y = average_residents_by_dimension[dimension_y]["average"]
      dimension_comparison = dimension_x <=> dimension_y
      average_comparison = average_x <=> average_y
      residents_comparison = residents_x <=> residents_y

      if dimension_comparison === 0
        residents_comparison
      else
        unless average_comparison === 0
          dimension_comparison
        else
          average_comparison
        end
      end
    end
  end

  def order_all(travel_plan_expand_list : Array(TravelPlanExpand)) : Array(TravelPlanExpand)
    travel_plan_expand_list.each do |t|
      order(t)
    end

    travel_plan_expand_list
  end

  def order(travel_plan_expand : TravelPlanExpand) : TravelPlanExpand
    average_residents_by_dimension = make_average_residents_by_dimension_hash(travel_plan_expand)
    travel_plan_expand.travel_stops = order_travel_stops(travel_plan_expand.travel_stops, average_residents_by_dimension)
    travel_plan_expand
  end

  def is(obj) : Bool
    if obj.has_key?("optimize")
      obj["optimize"] == "true"
    else
      false
    end
  end
end
