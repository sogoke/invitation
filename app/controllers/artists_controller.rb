class ArtistsController < ApplicationController
  def create
    @artist = Artist.new(params[:artist])
    @artist.save!
    render :nothing => true
  end
end
