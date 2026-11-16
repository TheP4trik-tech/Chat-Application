class Chat < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  has_many :messages, dependent: :destroy
  validates :sender, :recipient, presence: true

  # User cant have a chat with himself
  validates :recipient_id, comparison: { other_than: :sender_id }
  # If there is a chat between these users, it must be unique
  validate :unique_user_pair, on: :create

  def users
    [ sender, recipient ]
  end

  private

  def unique_user_pair
    return if sender_id.blank? || recipient_id.blank?

    duplicate = Chat.where(sender_id: sender_id, recipient_id: recipient_id)
                     .or(Chat.where(sender_id: recipient_id, recipient_id: sender_id))
                     .where.not(id: id)
                     .exists?

    errors.add(:base, "a chat between these users already exists") if duplicate
  end
end
