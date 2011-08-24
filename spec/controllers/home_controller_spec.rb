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
  end

  describe "Get 'join_us'" do
    it "routes to home#join_us" do
      { :get => "/join_us" }.should route_to(:controller => "home", :action => "join_us")
    end
    
    it "should render join_us.html.erb" do
      get 'join_us'
      response.should render_template("join_us")
    end
  end
  
  describe "Get 'about_us'" do
    it "routes to home#about_us" do
      { :get => "/about_us" }.should route_to(:controller => "home", :action => "about_us")
    end
    
    it "should render about_us.html.erb" do
      get 'about_us'
      response.should render_template("about_us")
    end
  end
end
