class SaleRecord < ApplicationRecord
    validates :title, :date, :count, presence: true
    validates :count, numericality: {only_integer: true, greater_than: 0}
    validates :date, uniqueness: {scope: :title}
end