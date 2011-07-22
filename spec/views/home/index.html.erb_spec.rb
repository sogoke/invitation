# encoding: utf-8

require 'spec_helper'

describe "home/index.html.erb" do
  it "contains a form generating a new artist" do
    assign(:artist, stub_model(Artist, :name => "alice"))
    
    render :template => "home/index.html.erb"
    
    rendered.should =~ /alice/
  end
end
