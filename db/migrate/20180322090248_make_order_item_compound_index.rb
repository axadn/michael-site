class MakeOrderItemCompoundIndex < ActiveRecord::Migration[5.1]
  def change
    remove_index :order_items, :order_id
    remove_index :order_items, :product_id
    add_index :order_items, [:order_id, :product_id], unique: true
  end
end
