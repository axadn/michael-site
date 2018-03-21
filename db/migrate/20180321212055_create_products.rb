class CreateProducts < ActiveRecord::Migration[5.1]
  def change
    create_table :products do |t|
      t.string :title
      t.string :category
      t.decimal :unit_price
      t.text :description
      t.string :image_url
      t.timestamps
    end
    add_index :products, :category
  end
end
