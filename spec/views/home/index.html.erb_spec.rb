# encoding: utf-8

require 'spec_helper'

describe "home/index.html.erb" do
  it "contains a form generating a new artist" do
    assign(:artist, stub_model(Artist, :name => "alice", :email => "fake@gmail.com"))
    
    render :template => "home/index.html.erb"
    
    rendered.should =~ /alice/
    rendered.should =~ /fake@gmail.com/
    rendered.should =~ /名字/
  end
end
