require 'rails_helper'

RSpec.describe Message, type: :model do
  describe 'associations' do
    it { should belong_to(:chat) }
    it { should belong_to(:sender).class_name('User') }
  end

  describe 'validations' do
    it { should validate_presence_of(:content) }
  end

  describe 'length validations' do
    it { should validate_length_of(:content).is_at_least(1).is_at_most(255) }
  end



  describe 'custom validations' do
  it "should be valid with valid attributes and allows user to send message in chat he is in" do
    user = create(:user)
    chat = create(:chat, sender: user, recipient: create(:user))
    message = build(:message, chat: chat, sender: user)
    expect(message).to be_valid
  end

  it "Should not allow user to send message into chat he is not in" do
    user = create(:user)
    chat = create(:chat, sender: create(:user), recipient: create(:user))
    message = build(:message, chat: chat, sender: user)
    expect(message).not_to be_valid
  end

  it "should allow chat recipient to send message in chat he is in" do
    user = create(:user)
    chat = create(:chat, sender: create(:user), recipient: user)
    message = build(:message, chat: chat, sender: user)
    expect(message).to be_valid
  end
  end
end
