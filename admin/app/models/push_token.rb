class PushToken < ActiveRecord::Base

  ##################
  ## associations ##
  ##################

  belongs_to :user, primary_key: :uuid
end
