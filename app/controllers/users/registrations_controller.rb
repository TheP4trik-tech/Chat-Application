class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  before_action :configure_sign_up_params, only: [ :create ]

  private

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [ :first_name, :last_name ])
  end

  ## by default devise would send json with all user rows, this prevents it from happening
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { user: { id: resource.id, first_name: resource.first_name, last_name: resource.last_name } }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
