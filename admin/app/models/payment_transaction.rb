class PaymentTransaction < ActiveRecord::Base

  PROCESSED_STATE = 'processed'

  belongs_to :user, primary_key: :uuid

end
