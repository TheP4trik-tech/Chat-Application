class AddUnorderedUniqueIndexToChats < ActiveRecord::Migration[8.1]
  def change
    # (sender_id, recipient_id) is order-sensitive, so it lets (1,2) and (2,1) both exist.
    # Index on the sorted pair instead so (1,2) and (2,1) collide at the DB level.
    remove_index :chats, name: "index_chats_on_sender_id_and_recipient_id"

    add_index :chats, "LEAST(sender_id, recipient_id), GREATEST(sender_id, recipient_id)",
              unique: true, name: "index_chats_on_unordered_user_pair"
  end
end
