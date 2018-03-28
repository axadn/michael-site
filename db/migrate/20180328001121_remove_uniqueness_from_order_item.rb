class RemoveUniquenessFromOrderItem < ActiveRecord::Migration[5.1]
  def change
    remove_index :order_items, [:order_id, :product_id]
    add_index :order_items, :order_id
    add_index :order_items, :product_id
  end
end
