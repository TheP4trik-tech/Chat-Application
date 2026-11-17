class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  private

  ## by default devise would send json with all user rows, this prevents it from happening
  def respond_with(resource, _opts = {})
    if resource.persisted?
      render json: { user: { id: resource.id, first_name: resource.first_name, last_name: resource.last_name } }, status: :created
    else
      render json: { errors: resource.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
