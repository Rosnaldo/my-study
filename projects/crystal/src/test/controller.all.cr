require "spec"
require "../fake_data"
require "../repository/itravel_plan"
require "../repository/mock_travel_plan"
require "../controller/travel_plan"


describe Array do
  repository = MockTravelPlanRepository.new
  controller = TravelPlanController.new(repository)

  describe "#Controller" do
    it "#all when is_expand is false and is_optimize is false" do
      t = controller.all(false, false)
      result = JSON.parse(%(#{t.to_json})) == JSON.parse(%(
        [{"id": 1, "travel_stops": [1, 2]}]
      ))
      result.should be_true
    end

    it "#all when is_expand is false and is_optimize is true" do
      t = controller.all(false, true)
      result = JSON.parse(%(#{t.to_json})) == JSON.parse(%(
        [{"id": 1, "travel_stops": [1, 2]}]
      ))
      result.should be_true
    end

    it "#all when is_expand is true and is_optimize is false" do
      t = controller.all(true, false)
      result = JSON.parse(%(#{t.to_json})) == JSON.parse(%(
        [
        {
          "id": 1,
          "travel_stops": [
            {
              "id": 1,
              "name": "Earth (C-137)",
              "type": "Planet",
              "dimension": "Dimension C-137"
            },
            {
              "id": 2,
              "name": "Abadango",
              "type": "Cluster",
              "dimension": "unknown"
            }
          ]
        }
      ]
      ))
      result.should be_true
    end

    it "#all when is_expand is true and is_optimize is true" do
      t = controller.all(true, true)
      result = JSON.parse(%(#{t.to_json})) == JSON.parse(%(
        [
        {
          "id": 1,
          "travel_stops": [
            {
              "id": 1,
              "name": "Earth (C-137)",
              "type": "Planet",
              "dimension": "Dimension C-137"
            },
            {
              "id": 2,
              "name": "Abadango",
              "type": "Cluster",
              "dimension": "unknown"
            }
          ]
        }
      ]
      ))
      result.should be_true
    end
  end
end
