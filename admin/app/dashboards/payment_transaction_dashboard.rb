require "administrate/base_dashboard"

class PaymentTransactionDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    id: Field::Number,
    uuid: Field::String,
    status: Field::String,
    metadata: Field::Text,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    payment_method: Field::String,
    payment_provider: Field::String,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :user,
    :id,
    :uuid,
    :status,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :user,
    :id,
    :uuid,
    :status,
    :metadata,
    :created_at,
    :updated_at,
    :payment_method,
    :payment_provider,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :user,
    :uuid,
    :status,
    :metadata,
    :payment_method,
    :payment_provider,
  ].freeze

  # Overwrite this method to customize how payment transactions are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(payment_transaction)
  #   "PaymentTransaction ##{payment_transaction.id}"
  # end
end
