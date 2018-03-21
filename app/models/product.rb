class Product < ApplicationRecord
    validates :title, :category, :unit_price, presence: true
    validates :title, uniqueness: true
    has_many :order_items, dependent: :destroy
end
