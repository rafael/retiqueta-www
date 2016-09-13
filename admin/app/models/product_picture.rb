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
                    hash_secret: '9d4a19189a71ba30c5475edfdf961bd5d2d044b9666b2a04d6616a27613bb5fb19406cdb7c4cbb81521abbba71d416453611e31f31815e5330e79df208bcee2e'
end
