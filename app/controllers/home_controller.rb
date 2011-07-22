class HomeController < ApplicationController
  def index
    @artist = Artist.new
  end
end
