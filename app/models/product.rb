class Product < ApplicationRecord
    include PgSearch
    pg_search_scope :search_by_title, against: :title,
    :using => {
                :tsearch => {:prefix => true}
              }
    validates :title, :category, :unit_price, presence: true
    validates :title, uniqueness: true
    has_many :order_items, dependent: :destroy
end
