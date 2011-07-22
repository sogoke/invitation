require 'spec_helper'

describe HomeController do

  describe "GET 'index'" do
    before do
      @artist = mock(Artist)
      Artist.stub!(:new).and_return(@artist)
    end
    
    it "routes to home#index" do
      { :get => "/" }.should route_to(:controller => "home", :action => "index")
    end
    
    it "generate a new artist" do
      Artist.should_receive(:new).and_return(@artist)
      get :index
    end
    
    it "should render index.html.erb" do
      get 'index'
      response.should render_template("index")
    end
    
    it "should be successful" do
      get 'index'
      response.should be_success
    end
  end

end
