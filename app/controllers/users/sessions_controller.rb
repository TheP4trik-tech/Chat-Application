class Users::SessionsController < Devise::SessionsController
  respond_to :json

  ## by default devise would send json with all user rows, this prevents it from happening
  private
  def respond_with(resource, _opts = {})
    render json: { user: { id: resource.id, first_name: resource.first_name, last_name: resource.last_name } }, status: :ok
  end

  def respond_to_on_destroy
    head :no_content
  end
end
