require "rails_helper"

RSpec.describe "Api::V1 authentication requirement", type: :request do
  let(:user) { create(:user) }
  let(:chat) { create(:chat, sender: user) }

  let(:protected_endpoints) do
    [
      [ :get, "/api/v1/users" ],
      [ :get, "/api/v1/users/#{user.id}" ],
      [ :patch, "/api/v1/users/#{user.id}" ],
      [ :get, "/api/v1/chats" ],
      [ :get, "/api/v1/chats/#{chat.id}" ],
      [ :post, "/api/v1/chats" ],
      [ :get, "/api/v1/chats/#{chat.id}/messages" ],
      [ :post, "/api/v1/chats/#{chat.id}/messages" ]
    ]
  end
  ## testing auth on all endpoints
  it "rejects every protected endpoint without a token" do
    protected_endpoints.each do |method, path|
      send(method, path)

      expect(response).to have_http_status(:unauthorized),
        "expected #{method.upcase} #{path} to require authentication, got #{response.status}"
    end
  end
end
