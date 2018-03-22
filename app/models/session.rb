class Session < ApplicationRecord
    validates :token, presence: true, uniqueness: true
    belongs_to :user, optional: true
    belongs_to :cart, class_name: :Order, foreign_key: :cart_id
end