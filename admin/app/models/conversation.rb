class Conversation < ActiveRecord::Base

  default_scope { order(created_at: :desc) }

  ##################
  ## associations ##
  ##################

  belongs_to :commentable, polymorphic: true, dependent: :delete
  has_many :comments
end
