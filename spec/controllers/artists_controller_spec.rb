require 'spec_helper'

describe ArtistsController do
    
  describe "POST 'create'" do
    it "routes to artists#create" do
      { :post => "/artists" }.should route_to( :controller => "artists", :action => "create" )
    end
    
    before(:each) do
      Artist.stub!(:new).and_return(@artist = double("artist", :name => "alice", :email => "fake@gmail.com", :save => true))
    end
    
    it "should create an artist to store" do      
      Artist.should_receive(:new).once.with("name" => "alice", "email" => "fake@gmail.com").and_return(@artist)
      
      post :create, :artist => {:name => "alice", :email => "fake@gmail.com"}
    end
    
    it "should save correctly" do
      @artist.should_receive(:save).and_return(true)
      
      post :create, :artist => {:name => "alice", :email => "fake@gmail.com"}
    end
  end
end
