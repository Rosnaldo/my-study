require "spec"
require "../helper/optimize_helper"
require "../fake_data"


describe Array do
  optimizeHelper = OptimizeHelper.new
  fake_data = FakeData.new

  describe "#OptimizeHelper" do
    it "#make_average_residents_by_dimension_hash" do
      travel_plan_expand = fake_data.make_travel_plan_expanded()

      hash = optimizeHelper.make_average_residents_by_dimension_hash(travel_plan_expand)
      hash == JSON.parse(%(
        {"unknown": {"total": 3, "average": 0.3333333333333333},
        "Replacement Dimension": {"total": 2, "average": 2.0}}
      ))
    end

    it "#order_travel_stops" do
      travel_plan_expand = fake_data.make_travel_plan_expanded()
      hash = optimizeHelper.make_average_residents_by_dimension_hash(travel_plan_expand)
      t = optimizeHelper.order_travel_stops(travel_plan_expand.travel_stops, hash)

      t.map{ |x| x.id }.to_json == "[19,9,2,11,7]"
    end
  end
end
