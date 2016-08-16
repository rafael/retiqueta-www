require "administrate/base_dashboard"

class BankAccountDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    profile: Field::BelongsTo,
    id: Field::Number,
    document_type: Field::String,
    document_id: Field::String,
    owner_name: Field::String,
    bank_name: Field::String,
    account_type: Field::String,
    account_number: Field::String,
    country: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }.freeze

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :profile,
    :id,
    :document_type,
    :document_id,
  ].freeze

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :profile,
    :id,
    :document_type,
    :document_id,
    :owner_name,
    :bank_name,
    :account_type,
    :account_number,
    :country,
    :created_at,
    :updated_at,
  ].freeze

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
  ].freeze

  # Overwrite this method to customize how bank accounts are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(bank_account)
  #   "BankAccount ##{bank_account.id}"
  # end
end
