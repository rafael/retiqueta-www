class Fulfillment < ActiveRecord::Base

  PENDING_STATUS = 'pending'

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
