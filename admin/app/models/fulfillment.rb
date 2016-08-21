class Fulfillment < ActiveRecord::Base

  FULFILLMENT_STATUSES = ['pending', 'delivered']

  validates :status, inclusion: { in: FULFILLMENT_STATUSES,
                                  message: "%{value} is not a valid status. Valid ones: #{FULFILLMENT_STATUSES.join(', ')}" }

  belongs_to :order, primary_key: :uuid
  has_one :conversation, as: :commentable
  delegate :comments, to: :conversation

  def buyer
    order.user.username
  end

  def seller
    order.line_items.first.product.user.username
  end
end
