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
  
  def visible
    result = Artist.visible.map do |artist|
      { name: artist.name, avatar: artist.avatar.url(:thumb), description: artist.description }
    end
    p result.inspect
    render json: result
  end
end
