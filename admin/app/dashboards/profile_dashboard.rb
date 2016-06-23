require "administrate/base_dashboard"

class ProfileDashboard < Administrate::BaseDashboard
  # ATTRIBUTE_TYPES
  # a hash that describes the type of each of the model's fields.
  #
  # Each different type represents an Administrate::Field object,
  # which determines how the attribute is displayed
  # on pages throughout the dashboard.
  ATTRIBUTE_TYPES = {
    user: Field::BelongsTo,
    id: Field::Number,
    created_at: Field::DateTime,
    updated_at: Field::DateTime,
    pic_file_name: Field::String,
    pic_content_type: Field::String,
    pic_file_size: Field::Number,
    pic_updated_at: Field::DateTime,
    bio: Field::Text,
    country: Field::String,
    first_name: Field::String,
    last_name: Field::String,
    website: Field::String,
  }

  # COLLECTION_ATTRIBUTES
  # an array of attributes that will be displayed on the model's index page.
  #
  # By default, it's limited to four items to reduce clutter on index pages.
  # Feel free to add, remove, or rearrange items.
  COLLECTION_ATTRIBUTES = [
    :user,
    :country,
    :first_name,
    :last_name,
    :created_at,
  ]

  # SHOW_PAGE_ATTRIBUTES
  # an array of attributes that will be displayed on the model's show page.
  SHOW_PAGE_ATTRIBUTES = [
    :user,
    :bio,
    :country,
    :first_name,
    :last_name,
    :website,
    :created_at,
    :updated_at,
    :pic_file_name,
    :pic_content_type,
    :pic_file_size,
    :pic_updated_at,
  ]

  # FORM_ATTRIBUTES
  # an array of attributes that will be displayed
  # on the model's form (`new` and `edit`) pages.
  FORM_ATTRIBUTES = [
    :bio,
    :country,
    :first_name,
    :last_name,
    :website,
  ]

  # Overwrite this method to customize how profiles are displayed
  # across all pages of the admin dashboard.
  #
  def display_resource(profile)
     "Profile ##{profile.id}"
  end
end
