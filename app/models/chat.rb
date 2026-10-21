class Chat < ApplicationRecord
  belongs_to :sender, class_name: "User"
  belongs_to :recipient, class_name: "User"
  validates :sender, :recipient, presence: true

  validates :sender_id, uniqueness: { scope: :recipient_id }

  validates :sender_id, comparison: { other_than: :recipient_id }
end
