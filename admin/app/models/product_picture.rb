class ProductPicture < ActiveRecord::Base
  belongs_to :user, primary_key: :uuid
  belongs_to :product, primary_key: :uuid
end
