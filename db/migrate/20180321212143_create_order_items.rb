class CreateOrderItems < ActiveRecord::Migration[5.1]
  def change
    create_table :order_items do |t|
      t.integer :product_id
      t.integer :order_id
      t.integer :quantity
      t.decimal :unit_price
      t.timestamps
    end
    add_index :order_items, :order_id
    add_index :order_items, :product_id
    add_foreign_key :order_items, :orders 
    add_foreign_key :order_items, :products
  end
end
