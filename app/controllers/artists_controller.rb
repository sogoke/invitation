class ArtistsController < ApplicationController
  def create
    p params[:artist].inspect
    @artist = Artist.new(params[:artist])
    @artist.save!
    render :nothing => true
  end
end
