class ArtistsController < ApplicationController
  def create
    @artist = Artist.new(params[:artist])
    @artist.save!
    
    redirect_to "/", notice: "successful"
  end
end
