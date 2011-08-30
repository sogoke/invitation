class Artist
  include Mongoid::Document
  include Mongoid::Timestamps
  
  field :name
  field :description
  field :email
  mount_uploader :avatar, AvatarUploader
  
  validates :name, presence: true, uniqueness: true, length: { within: 2..30 }, format: { with: /^[\w\u4e00-\u9fa5]+$/ }
  validates :email, presence: true, uniqueness: true, format: { with: /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/ }
  
  scope :visible, where(:avatar.exists => true).not_in(:description => ["", nil])
end
