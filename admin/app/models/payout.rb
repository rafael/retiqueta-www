class Payout < ActiveRecord::Base

  PROCESSING_STATUS = 'processing'
  PAID_STATUS = 'paid'

  belongs_to :user, primary_key: :uuid

  def fulfillments
    sales = Sale.where(user_id: user.uuid)
    Kaminari.paginate_array(Order.where(uuid: sales.map(&:order_id)).map(&:fulfillment))
  end
end
