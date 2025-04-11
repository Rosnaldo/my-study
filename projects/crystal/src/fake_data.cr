require "./serializable/index"


class FakeData
	def make_travel_plans : Array(TravelPlan)
		Array(TravelPlan).from_json([
			TravelPlan.from_json({
				"id": 1,
				"travel_stops": [1, 2],
			}.to_json)
		].to_json)
	end

	def make_travel_plan : TravelPlan
		TravelPlan.from_json(
			{
				"id": 1,
				"travel_stops": [1, 2],
			}.to_json
		)
	end

  def make_travel_stops : Array(TravelStop)
    Array(TravelStop).from_json([
      TravelStop.from_json({
				"id": 1,
				"name": "Earth (C-137)",
				"type": "Planet",
				"dimension": "Dimension C-137",
				"residents": [
					"https://rickandmortyapi.com/api/character/38",
					"https://rickandmortyapi.com/api/character/45",
					"https://rickandmortyapi.com/api/character/71",
				]
			}.to_json),
			TravelStop.from_json({
				"id": 2,
				"name": "Abadango",
				"type": "Cluster",
				"dimension": "unknown",
				"residents": [
					"https://rickandmortyapi.com/api/character/6"
				]
			}.to_json)
    ].to_json)
  end

	def make_travel_stop : TravelStop
		TravelStop.from_json({
			"id": 1,
			"name": "Abadango",
			"type": "Cluster",
			"dimension": "unknown",
			"residents": [
				"https://rickandmortyapi.com/api/character/6"
			]
		}.to_json)
	end

	def make_travel_plan_expanded : TravelPlanExpand
		TravelPlanExpand.from_json(
			{
				"id": 1,
				"travel_stops": [
					{
						"id": 2,
						"name": "Abadango",
						"type": "Cluster",
						"dimension": "unknown",
						"residents": ["https://rickandmortyapi.com/api/character/6"]
					}, {
						"id": 7,
						"name": "Immortality Field Resort",
						"type": "Resort",
						"dimension": "unknown",
						"residents": [
							"https://rickandmortyapi.com/api/character/23",
							"https://rickandmortyapi.com/api/character/204",
							"https://rickandmortyapi.com/api/character/320"
						]
					}, {
						"id": 9,
						"name": "Purge Planet",
						"type": "Planet",
						"dimension": "Replacement Dimension",
						"residents": [
							"https://rickandmortyapi.com/api/character/26",
							"https://rickandmortyapi.com/api/character/139",
							"https://rickandmortyapi.com/api/character/202",
							"https://rickandmortyapi.com/api/character/273"
						]
					}, {
						"id": 11,
						"name": "Bepis 9",
						"type": "Planet",
						"dimension": "unknown",
						"residents": ["https://rickandmortyapi.com/api/character/35"]
					}, {
						"id": 19,
						"name": "Gromflom Prime",
						"type": "Planet",
						"dimension": "Replacement Dimension",
						"residents": [] of String
					}
				]
			}.to_json
		)
	end
end
