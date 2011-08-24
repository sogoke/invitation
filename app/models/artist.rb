class Artist
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name
  field :description
  field :email
  mount_uploader :avatar, AvatarUploader
  
  validates :name, presence: true, uniqueness: true
  validates :name, presence: true, uniqueness: true
  validates_format_of :email, :with => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
end
