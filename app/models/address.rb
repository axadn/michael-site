class Address < ApplicationRecord
    belongs_to :user
    validates :country, :street_address_1, :state, :zip, :user_id, presence: true
end
