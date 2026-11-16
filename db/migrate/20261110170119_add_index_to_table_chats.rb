class AddIndexToTableChats < ActiveRecord::Migration[8.1]
  def change
    add_index :chats, [ :sender_id, :recipient_id ], unique: true
  end
end
