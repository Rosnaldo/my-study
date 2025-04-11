require "jennifer"
require "jennifer/adapter/postgres"
require "dotenv"

Dotenv.load

APP_ENV = ENV["APP_ENV"]? || "development"

Jennifer::Config.configure do |conf|
  conf.read("config/database.yml", :development)
  conf.from_uri(ENV["DB"])
end
