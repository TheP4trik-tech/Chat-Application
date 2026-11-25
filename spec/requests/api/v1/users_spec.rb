require "rails_helper"

RSpec.describe "Api::V1::Users", type: :request do
  let(:user) { create(:user) }

  describe "GET /api/v1/users/:id" do
    it "connects when authenticated" do
      get "/api/v1/users/#{user.id}", headers: auth_headers_for(user)
      expect(response).to have_http_status(:ok)
    end
    it "returns the user" do
      get "/api/v1/users/#{user.id}", headers: auth_headers_for(user)
      expect(response.body).to include(user.id.to_s)
    end
    it "updates the user" do
      patch "/api/v1/users/#{user.id}", params: { user: { first_name: "new name" } }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:ok)
      expect(user.reload.first_name).to eq("new name")
    end

    it "returns 404 for a nonexistent user" do
      get "/api/v1/users/0", headers: auth_headers_for(user)

      expect(response).to have_http_status(:not_found)
    end

    it "forbids updating another user's account" do
      other_user = create(:user)

      patch "/api/v1/users/#{other_user.id}", params: { user: { first_name: "hijacked" } }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:forbidden)
      expect(other_user.reload.first_name).not_to eq("hijacked")
    end

    it "returns 422 for invalid update params" do
      patch "/api/v1/users/#{user.id}", params: { user: { first_name: "" } }, headers: auth_headers_for(user)

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end

  describe "GET /api/v1/users" do
    it "connects when authenticated" do
      get "/api/v1/users", headers: auth_headers_for(user)

      expect(response).to have_http_status(:ok)
    end
    it "returns all users, expect the one who made request" do
      user2 = create(:user)
      patch "/api/v1/users/#{user2.id}", params: {
        user: { email: "new@example.com", password: "password123", first_name: "A", last_name: "B" }
      }, headers: auth_headers_for(user)

      get "/api/v1/users", headers: auth_headers_for(user)
      expect(response.body).to include(user2.id.to_s)
    end
  end
end
