require "kemal"
require "jennifer"
require "./helper/expand_helper"
require "./helper/optimize_helper"
require "./models/travel_plan"
require "./repository/travel_plan"
require "./repository/itravel_plan"
require "./serializable/index"
require "./controller/travel_plan"
require "../config/config"
require "./fake_data"


module Routes
  expandHelper = ExpandHelper.new
  optimizeHelper = OptimizeHelper.new
  repository = TravelPlanRepository.new
  controller = TravelPlanController.new(repository)

  before_all do |env|
    env.response.headers["Access-Control-Allow-Origin"] = "*"
    # env.response.headers["Access-Control-Allow-Credentials"] = "true"
    env.response.headers["Access-Control-Allow-Methods"] = "GET, POST, PUT, DELETE, OPTIONS, HEAD"
    env.response.headers["Access-Control-Allow-Headers"] = "*"
  end

  get "/travel_plans" do |env|
    is_optimize = optimizeHelper.is(env.params.query)
    is_expand = expandHelper.is(env.params.query)
    controller.all(is_expand, is_optimize).to_json
  end

  get "/travel_plans/:id" do |env|
    id = env.params.url["id"].to_i32
    is_optimize = optimizeHelper.is(env.params.query)
    is_expand = expandHelper.is(env.params.query)
    controller.one(id, is_expand, is_optimize).to_json
  end

  options "/travel_plans" do |env|
    env.response.status_code = 200
  end

  post "/travel_plans" do |env|
    travel_stops = Array(Int32).from_json(env.params.json["travel_stops"].to_s)
    env.response.status_code = 201
    controller.create(travel_stops).to_json
  end

  options "/travel_plans/:id/append" do |env|
    env.response.status_code = 200
  end

  post "/travel_plans/:id/append" do |env|
    travel_stops = Array(Int32).from_json(env.params.json["travel_stops"].to_s)
    id = env.params.url["id"].to_i32
    controller.append(id, travel_stops).to_json
  end

  options "/travel_plans/:id" do |env|
    env.response.status_code = 200
  end

  put "/travel_plans/:id" do |env|
    id = env.params.url["id"].to_i32
    travel_stops = Array(Int32).from_json(env.params.json["travel_stops"].to_s)
    controller.update(travel_stops, id).to_json
  end

  delete "/travel_plans/:id" do |env|
    env.response.status_code = 204
    id = env.params.url["id"].to_i32
    controller.delete(id)
  end
end

Kemal.run(3000)
