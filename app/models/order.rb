class Order < ApplicationRecord
    belongs_to :user, optional: true
    has_many :order_items, dependent: :destroy
    validates :status, presence: true
end
