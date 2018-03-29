class OrderItem < ApplicationRecord
    belongs_to :order
    belongs_to :product
    validates :quantity, presence: true,
      numericality: {only_integer: true, greater_than: 0}
    validates :unit_price, presence: true,
      numericality: {greater_than: 0}
    validate :product_active, on: :create

    def product_active
      unless product.active
        errors.add(:product, "is not active") unless product.active
        return false
      end
      true
    end
end