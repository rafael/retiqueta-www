
class Payout < ActiveRecord::Base

  default_scope { order(created_at: :desc) }

  PROCESSING_STATUS = 'processing'
  PAID_STATUS = 'paid'

  belongs_to :user, primary_key: :uuid
end
