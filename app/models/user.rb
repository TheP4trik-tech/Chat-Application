class User < ApplicationRecord
  validates :first_name, :last_name, presence: true

  has_many :initiated_chats, class_name: "Chat", foreign_key: "sender_id", dependent: :destroy
  has_many :received_chats, class_name: "Chat", foreign_key: "recipient_id", dependent: :destroy
end
