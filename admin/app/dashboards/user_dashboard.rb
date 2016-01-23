require "administrate/base_dashboard"

class UserDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    profile: Field::HasOne,
    products: Field::HasMany,
    push_tokens: Field::HasMany,
    id: Field::Number,
    username: Field::String,
    uuid: Field::String,
    email: Field::String,
    crypted_password: Field::String,
    password_salt: Field::String,
    persistence_token: Field::String,
    perishable_token: Field::String,
    login_count: Field::Number,
    failed_login_count: Field::Number,
    last_request_at: Field::DateTime,
    current_login_at: Field::DateTime,
    last_login_at: Field::DateTime,
    current_login_ip: Field::String,
    last_login_ip: Field::String,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
  }

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :profile,
    :products,
    :push_tokens,
    :id,
  ]

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :profile,
    :products,
    :push_tokens,
    :id,
    :username,
    :uuid,
    :email,
    :crypted_password,
    :password_salt,
    :persistence_token,
    :perishable_token,
    :login_count,
    :failed_login_count,
    :last_request_at,
    :current_login_at,
    :last_login_at,
    :current_login_ip,
    :last_login_ip,
    :created_at,
    :updated_at,
  ]

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :profile,
    :products,
    :push_tokens,
    :username,
    :uuid,
    :email,
    :crypted_password,
    :password_salt,
    :persistence_token,
    :perishable_token,
    :login_count,
    :failed_login_count,
    :last_request_at,
    :current_login_at,
    :last_login_at,
    :current_login_ip,
    :last_login_ip,
  ]

  # Overwrite this method to customize how users are displayed
  # across all pages of the admin dashboard.
  #
  # def display_resource(user)
  #   "User ##{user.id}"
  # end
end
