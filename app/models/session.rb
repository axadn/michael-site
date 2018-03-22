class Session < ApplicationRecord
    validates :token, presence: true, uniqueness: true
    belongs_to :user
    belongs_to :cart, class_name: :order, foreign_key: :cart_id
end