require "rails_helper"

RSpec.describe "Users::Registrations", type: :request do
  describe "POST /api/v1/signup" do
    it "connects and returns a JWT" do
      post "/api/v1/signup", params: {
        user: { email: "new@example.com", password: "password123", first_name: "A", last_name: "B" }
      }

      expect(response).to have_http_status(:created)
      expect(response.headers["Authorization"]).to be_present
    end

    it "returns 422 when email is missing" do
      post "/api/v1/signup", params: {
        user: { email: "", password: "password123", first_name: "A", last_name: "B" }
      }

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns 422 when password is missing" do
      post "/api/v1/signup", params: {
        user: { email: "new@example.com", password: "", first_name: "A", last_name: "B" }
      }

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns 422 when first_name or last_name is missing" do
      post "/api/v1/signup", params: {
        user: { email: "new@example.com", password: "password123", first_name: "", last_name: "" }
      }

      expect(response).to have_http_status(:unprocessable_entity)
    end

    it "returns 422 for a duplicate email" do
      create(:user, email: "taken@example.com")

      post "/api/v1/signup", params: {
        user: { email: "taken@example.com", password: "password123", first_name: "A", last_name: "B" }
      }

      expect(response).to have_http_status(:unprocessable_entity)
    end
  end
end
