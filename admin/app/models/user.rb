class User < ActiveRecord::Base

  default_scope { order(created_at: :desc) }

  ##################
  ## associations ##
  ##################

  has_one :profile, autosave: true
  has_many :products, primary_key: :uuid
  has_many :push_tokens, primary_key: :uuid
end
