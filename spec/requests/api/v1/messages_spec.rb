require "rails_helper"

RSpec.describe "Api::V1::Messages", type: :request do
  let(:user) { create(:user) }
  let(:chat) { create(:chat, sender: user) }

  describe "GET /api/v1/chats/:chat_id/messages" do
    it "connects when authenticated" do
      get "/api/v1/chats/#{chat.id}/messages", headers: auth_headers_for(user)

      expect(response).to have_http_status(:ok)
    end

    it "returns messages in creation order" do
      older = create(:message, chat: chat, sender: user, content: "first", created_at: 1.hour.ago)
      newer = create(:message, chat: chat, sender: user, content: "second")

      get "/api/v1/chats/#{chat.id}/messages", headers: auth_headers_for(user)

      body = JSON.parse(response.body)
      ids = body["messages"].map { |message| message["id"] }
      expect(ids).to eq([ older.id, newer.id ])
    end

    it "returns 404 for a chat the user is not part of" do
      other_chat = create(:chat)

      get "/api/v1/chats/#{other_chat.id}/messages", headers: auth_headers_for(user)

      expect(response).to have_http_status(:not_found)
    end

    it "returns 404 for a nonexistent chat" do
      get "/api/v1/chats/0/messages", headers: auth_headers_for(user)

      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/chats/:chat_id/messages" do
    it "creates a message" do
      post "/api/v1/chats/#{chat.id}/messages", params: { content: "hello" }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:created)
    end

    it "returns 422 for blank content" do
      post "/api/v1/chats/#{chat.id}/messages", params: { content: "" }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns 404 for a chat the user is not part of" do
      other_chat = create(:chat)

      post "/api/v1/chats/#{other_chat.id}/messages", params: { content: "hello" }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:not_found)
    end
  end
end
