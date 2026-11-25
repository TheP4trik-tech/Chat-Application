require "rails_helper"

RSpec.describe "Api::V1::Chats", type: :request do
  let(:user) { create(:user) }

  describe "GET /api/v1/chats" do
    it "connects when authenticated" do
      get "/api/v1/chats", headers: auth_headers_for(user)

      expect(response).to have_http_status(:ok)
    end

    it "excludes chats the user is not part of" do
      my_chat = create(:chat, sender: user)
      other_chat = create(:chat)

      get "/api/v1/chats", headers: auth_headers_for(user)

      expect(response.body).to include(my_chat.id.to_s)
      expect(response.body).not_to include(other_chat.id.to_s)
    end
  end

  describe "GET /api/v1/chats/:id" do
    it "returns the chat when the user is a participant" do
      chat = create(:chat, sender: user)

      get "/api/v1/chats/#{chat.id}", headers: auth_headers_for(user)

      expect(response).to have_http_status(:ok)
    end

    it "returns 404 for a chat the user is not part of" do
      other_chat = create(:chat)

      get "/api/v1/chats/#{other_chat.id}", headers: auth_headers_for(user)

      expect(response).to have_http_status(:not_found)
    end

    it "returns 404 for a nonexistent chat" do
      get "/api/v1/chats/0", headers: auth_headers_for(user)

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/chats" do
    it "creates a chat with another user" do
      recipient = create(:user)

      post "/api/v1/chats", params: { recipient_id: recipient.id }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:created)
    end

    it "returns 422 when starting a chat with yourself" do
      post "/api/v1/chats", params: { recipient_id: user.id }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns 422 for a duplicate chat between the same two users" do
      recipient = create(:user)
      create(:chat, sender: user, recipient: recipient)

      post "/api/v1/chats", params: { recipient_id: recipient.id }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns 422 for a nonexistent recipient" do
      post "/api/v1/chats", params: { recipient_id: 0 }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
