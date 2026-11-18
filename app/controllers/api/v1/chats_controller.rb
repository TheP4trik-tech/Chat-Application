module Api
  module V1
    class ChatsController < BaseController
      def index
        chats = Chat.where(sender_id: current_user.id).or(Chat.where(recipient_id: current_user.id))
        render json: { chats: chats.map { |chat| chat_json(chat) } }
      end

      def show
        chat = find_chat
        return render json: { errors: [ "Chat not found" ] }, status: :not_found unless chat

        render json: { chat: chat_json(chat) }
      end

      def create
        chat = Chat.new(sender: current_user, recipient_id: params[:recipient_id])

        if chat.save
          render json: { chat: chat_json(chat) }, status: :created
        else
          render json: { errors: chat.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def find_chat
        chat = Chat.find_by(id: params[:id])
        chat if chat&.users&.include?(current_user)
      end

      def chat_json(chat)
        other_user = chat.users.find { |user| user.id != current_user.id }
        {
          id: chat.id,
          other_user: { id: other_user.id, first_name: other_user.first_name, last_name: other_user.last_name },
          created_at: chat.created_at
        }
      end
    end
  end
end
