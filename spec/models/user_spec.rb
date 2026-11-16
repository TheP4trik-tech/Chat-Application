require 'rails_helper'

RSpec.describe User, type: :model do
  subject { build(:user) }
  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end
  it 'is not valid without a first_name' do
    subject.first_name = nil
    expect(subject).to_not be_valid
  end
  it 'is not valid without a last_name' do
    subject.last_name = nil
    expect(subject).to_not be_valid
  end
  it "should not access chats of other users" do
    user1 = create(:user)
    user2 = create(:user)
    user3 = create(:user)
    chat1 = create(:chat, sender: user1, recipient: user2)
    chat2 = create(:chat, sender: user2, recipient: user3)
    expect(user1.initiated_chats).to include(chat1)
    expect(user1.received_chats).not_to include(chat2)
    expect(user1.initiated_chats).not_to include(chat2)
  end

  it "should delete all chats of a user when user is deleted"
end
