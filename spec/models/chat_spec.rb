require 'rails_helper'

RSpec.describe Chat, type: :model do
  describe 'associations' do
    it { should belong_to(:sender).class_name('User') }
    it { should belong_to(:recipient).class_name('User') }
  end

  describe 'validations' do
    it { should validate_presence_of(:sender) }
    it { should validate_presence_of(:recipient) }
  end

  describe 'custom validations' do
    it 'does not allow sender and recipient to be the same user' do
      user = build_stubbed(:user)
      chat = build(:chat, sender: user, recipient: user)

      expect(chat).not_to be_valid
    end
    it "does not allow a chat between two users who have already started a chat" do
    user1 = create(:user)
    user2 = create(:user)
    chat1 = create(:chat, sender: user1, recipient: user2)
    chat2 = build(:chat, sender: user1, recipient: user2)
    expect(chat1).to be_valid
    expect(chat2).not_to be_valid
  end
  end
  end
