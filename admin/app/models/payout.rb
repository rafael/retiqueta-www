class Payout < ActiveRecord::Base

  PAYOUT_STATUSES = ['paid', 'processing', 'pending']

  belongs_to :user, primary_key: :uuid

  validates :status, inclusion: { in: PAYOUT_STATUSES,
                                  message: "%{value} is not a valid status. Valid ones: #{PAYOUT_STATUSES.join(', ')}" }

  def fulfillments
    sales = Sale.where(user_id: user.uuid)
    Kaminari.paginate_array(Order.where(uuid: sales.map(&:order_id)).map(&:fulfillment))
  end
end
