class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :title, null: false
      t.string :category, null: false
      t.decimal :unit_price, null: false
      t.text :description, null: false, default: ""
      t.string :image_url
      t.timestamps
    end
    add_index :products, :title, unique: true
    add_index :products, :category
  end
end
