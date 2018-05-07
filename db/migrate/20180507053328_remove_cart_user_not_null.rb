class RemoveCartUserNotNull < ActiveRecord::Migration[5.1]
  def change
    change_column :sessions, :user_id, :integer
  end
end
