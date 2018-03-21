class CreateAddresses < ActiveRecord::Migration[5.1]
  def change
    create_table :addresses do |t|
      t.string :country, null: false
      t.string :street_address_1, null: false
      t.string :street_address_2, null: false
      t.string :state, null: false
      t.string :zip, null: false
      t.integer :user_id, null: false
      t.timestamps
    end
    add_foreign_key :addresses, :users
  end
end
