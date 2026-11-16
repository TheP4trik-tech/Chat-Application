FactoryBot.define do
  factory :message do
    content { "MyText" }
    association :chat, factory: :chat
    association :sender, factory: :user
  end
end
