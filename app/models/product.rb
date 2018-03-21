class Product < ApplicationRecord
    validates :title, :category, :unit_price, presence: true
    validates :title, uniqueness: true
end
