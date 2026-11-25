module AuthHelpers
  def auth_headers_for(user)
    post "/api/v1/login", params: { user: { email: user.email, password: user.password } }
    { "Authorization" => response.headers["Authorization"] }
  end
end

RSpec.configure do |config|
  config.include AuthHelpers, type: :request
end
