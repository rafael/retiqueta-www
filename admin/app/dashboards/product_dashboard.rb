require "administrate/base_dashboard"

class ProductDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    product_pictures: Field::HasMany,
    id: Field::Number,
    uuid: Field::String,
    title: Field::String,
    description: Field::Text,
    category: Field::String,
    price: Field::Number.with_options(decimals: 2),
    original_price: Field::Number.with_options(decimals: 2),
    featured: Field::Boolean,
    currency: Field::String,
    status: Field::String,
    location: Field::String,
    lat_lon: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    cached_votes_total: Field::Number,
    cached_votes_score: Field::Number,
    cached_votes_up: Field::Number,
    cached_votes_down: Field::Number,
    cached_weighted_score: Field::Number,
    cached_weighted_total: Field::Number,
    cached_weighted_average: Field::Number.with_options(decimals: 2),
  }

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :user,
    :title,
    :description,
    :featured,
    :status,
  ]

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :uuid,
    :user,
    :product_pictures,
    :title,
    :description,
    :category,
    :price,
    :original_price,
    :featured,
    :currency,
    :status,
    :location,
    :lat_lon,
    :created_at,
    :updated_at,
  ]

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :user,
    :uuid,
    :title,
    :description,
    :category,
    :price,
    :original_price,
    :featured,
    :currency,
    :status,
    :location,
    :product_pictures,
  ]

  # Overwrite this method to customize how products are displayed
  # across all pages of the admin dashboard.
  #
   def display_resource(product)
     "Product id ##{product.uuid}"
   end
end
