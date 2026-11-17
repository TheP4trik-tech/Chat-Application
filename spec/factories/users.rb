FactoryBot.define do
  factory :user do
    first_name { "MyString" }
    last_name { "MyString" }
    sequence(:email) { |n| "user#{n}@example.com" }
    password { "password123" }
  end
end
