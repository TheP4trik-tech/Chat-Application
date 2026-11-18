module Api
  module V1
    class UsersController < BaseController
      def index
        users = User.where.not(id: current_user.id)
        render json: { users: users.map { |user| user_json(user) } }
      end

      def show
        user = User.find(params[:id])
        render json: { user: user_json(user) }
      rescue ActiveRecord::RecordNotFound
        render json: { errors: [ "User not found" ] }, status: :not_found
      end

      def update
        unless current_user.id == params[:id].to_i
          return render json: { errors: [ "You can only update your own account" ] }, status: :forbidden
        end

        if current_user.update(user_params)
          render json: { user: user_json(current_user) }
        else
          render json: { errors: current_user.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def user_params
        params.require(:user).permit(:first_name, :last_name)
      end

      def user_json(user)
        { id: user.id, first_name: user.first_name, last_name: user.last_name }
      end
    end
  end
end
