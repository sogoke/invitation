class Artist
  include Mongoid::Document
  
  field :name
  field :avatar
  field :description
  field :email
  
  validates_presence_of :name, :email
  validates_format_of :email, :with => /^[0-9a-zA-Z]+@(([0-9a-zA-Z]+)[.])+[a-z]{2,4}$/i
  validates_uniqueness_of :email
end
