class Message < ApplicationRecord
  belongs_to :chat
  belongs_to :sender, class_name: "User"

  validates :content, presence: true, length: { minimum: 1, maximum: 255 }
  validate :message_sender_must_be_in_chat

  private
  ## User cant send a message in chat he is not in
  def message_sender_must_be_in_chat
    return if chat&.users&.include?(sender)
    errors.add(:sender, "can't send messages in this chat")
  end
end
