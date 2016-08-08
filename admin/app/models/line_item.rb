class LineItem < ActiveRecord::Base
  belongs_to :order, primary_key: :uuid
  belongs_to :product, polymorphic: true, primary_key: :uuid
end
