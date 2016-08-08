class PaymentTransaction < ActiveRecord::Base

  default_scope { order(created_at: :desc) }

  PROCESSED_STATE = 'processed'

  belongs_to :user, primary_key: :uuid

end
