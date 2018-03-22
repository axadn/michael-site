class AddCartIdToSession < ActiveRecord::Migration[5.1]
  def change
    add_column :sessions, :cart_id, :integer
    add_foreign_key :sessions, :orders, column: :cart_id
  end
end
