class Users::SessionsController < Devise::SessionsController
  include ActionController::MimeResponds

  respond_to :json

  # The JWT warden strategy never stores the user in the session (it's stateless),
  # so this check would always think no one is signed in and return 401.
  # Actual token revocation happens separately in Warden::JWTAuth::Middleware::RevocationManager.
  skip_before_action :verify_signed_out_user, only: :destroy

  ## by default devise would send json with all user rows, this prevents it from happening
  private
  def respond_with(resource, _opts = {})
    render json: { user: { id: resource.id, first_name: resource.first_name, last_name: resource.last_name } }, status: :ok
  end
end
