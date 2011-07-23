class Artist
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name
  field :avatar
  field :description
  field :email
  
  validates_presence_of :name, :email
  validates_format_of :email, :with => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  validates_uniqueness_of :email
end
