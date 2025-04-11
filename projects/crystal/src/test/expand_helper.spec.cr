require "spec"
require "../helper/expand_helper"
require "../fake_data"


describe Array do
  expandHelper = ExpandHelper.new
  fake_data = FakeData.new

  describe "#ExpandHelper" do
    it "#make_travel_stops_hash" do
      travel_stops = [1, 2]
      hash = expandHelper.make_travel_stops_hash(travel_stops)
      hash[1].dimension.should eq "Dimension C-137"
      hash[2].dimension.should eq "unknown"
    end

    it "#is when expand is true" do
      obj = { expand: "true" }
      expandHelper.is(obj).should be_true
    end

    it "#is when expand is false" do
      obj = { expand: "false" }
      expandHelper.is(obj).should be_false
    end

    it "#make_locations when array is empty" do
      l = expandHelper.make_locations([] of Int32)
      l == ""
    end

    it "#make_locations when array has one element" do
      l = expandHelper.make_locations([] of Int32)
      l == "1"
    end

    it "#make_locations when array is has more than one element" do
      l = expandHelper.make_locations([] of Int32)
      l == "1,2,3"
    end
  end
end
