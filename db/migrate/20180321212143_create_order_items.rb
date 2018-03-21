class CreateOrderItems < ActiveRecord::Migration[5.1]
  def change
    create_table :order_items do |t|
      t.integer :product_id, null: false
      t.integer :order_id, null: false
      t.integer :quantity, null: false
      t.decimal :unit_price, null: false
      t.timestamps
    end
    add_index :order_items, :order_id
    add_index :order_items, :product_id
    add_foreign_key :order_items, :orders 
    add_foreign_key :order_items, :products
  end
end
