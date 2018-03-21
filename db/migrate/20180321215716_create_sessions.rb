class CreateSessions < ActiveRecord::Migration[5.1]
  def change
    create_table :sessions do |t|
      t.string :token, null: false
      t.integer :user_id
    end
    add_index :sessions, :token, unique: true
  end
end
