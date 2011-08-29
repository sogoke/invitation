class ArtistsController < ApplicationController
  def create
    @artist = Artist.new(params[:artist])
    @artist.save!
    
    redirect_to "/", notice: "#{@artist.email}"
  end
  
  def exist
    condition = {}
    condition[params[:token]] = params[params[:token]]
    render json: { exist: !Artist.exists?(conditions: condition) }
  end
end
