class Product < ActiveRecord::Base

  default_scope { order(created_at: :desc) }

  ##################
  ## associations ##
  ##################

  belongs_to :user, primary_key: :uuid
  has_many :product_pictures, -> { order(position: :asc) }, primary_key: :uuid

  def product_picture_ids
    product_pictures.map(&:id)
  end
end
