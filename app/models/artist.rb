class Artist
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name
  field :description
  field :email
  mount_uploader :avatar, AvatarUploader
  
  validates :name, presence: true, uniqueness: true, length: { minimum: 2 }
  validates :email, presence: true, uniqueness: true
  validates_format_of :email, :with => /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/
  
  scope :visible, where(:avatar.exists => true).not_in(:description => ["", nil])
end
