require 'spec_helper'

describe ArtistsController do
  
  describe "POST 'create'" do
    before do
      
    end
    
    it "routes to artist#create" do
      { :post => "/artists" }.should route_to(:controller => "artists", :action => "create")
    end
  end
end
