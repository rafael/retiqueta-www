class ProductPicture < ActiveRecord::Base
  belongs_to :user, primary_key: :uuid
  belongs_to :product, primary_key: :uuid

  # Hack, hack. This must match the secret in the API app
  has_attached_file :pic,
                    styles: {
                      small:  '320x320#',
                      large: '720x720#',
                      medium: '450x450#',
                    },
                    url: ':s3_domain_url',
                    path: "/product_pictures/:hash.:extension",
                    hash_secret: Rails.application.secrets.api_secret_key_base
end
