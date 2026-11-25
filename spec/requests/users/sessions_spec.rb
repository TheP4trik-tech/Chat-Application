require "rails_helper"

RSpec.describe "Users::Sessions", type: :request do
  let(:user) { create(:user) }

  describe "POST /api/v1/login" do
    it "connects and returns a JWT" do
      post "/api/v1/login", params: { user: { email: user.email, password: user.password } }

      expect(response).to have_http_status(:ok)
      expect(response.headers["Authorization"]).to be_present
    end

    it "returns 401 for the wrong password" do
      post "/api/v1/login", params: { user: { email: user.email, password: "wrong-password" } }

      expect(response).to have_http_status(:unauthorized)
    end

    it "returns 401 for a nonexistent email" do
      post "/api/v1/login", params: { user: { email: "nobody@example.com", password: "password123" } }

      expect(response).to have_http_status(:unauthorized)
    end
  end

  describe "DELETE /api/v1/logout" do
    it "log_out" do
      delete "/api/v1/logout", headers: auth_headers_for(user)
      expect(response).to have_http_status(:no_content)
    end

    it "revokes the token so it can't be reused" do
      headers = auth_headers_for(user)

      delete "/api/v1/logout", headers: headers
      expect(response).to have_http_status(:no_content)

      get "/api/v1/users", headers: headers
      expect(response).to have_http_status(:unauthorized)
    end
  end
end
