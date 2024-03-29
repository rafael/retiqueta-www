class Order < ActiveRecord::Base

  PAID_STATUS = 'paid'

  ##################
  ## associations ##
  ##################

  belongs_to :user, primary_key: :uuid
  belongs_to :payment_transaction, primary_key: :uuid
  has_many :line_items, primary_key: :uuid
  has_one :fulfillment, primary_key: :uuid

  ################
  ## Extensions ##
  ################

  def sellers
    line_items.map(&:product).map(&:user)
  end
end
