class ArtistsController < ApplicationController
  def create
    @artist = Artist.new params[:artist]
    
    flash[:notice] = "successful" if @artist.save
    render "home/index"
  end
end
