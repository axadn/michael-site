class CreateSales < ActiveRecord::Migration[5.1]
  def change
    create_table :sale_records do |t|
      t.string :title, null: false
      t.integer :count, null: false
      t.datetime :date, null: false
    end
    add_index :sale_records, [:date, :title], unique: true
  end
end
