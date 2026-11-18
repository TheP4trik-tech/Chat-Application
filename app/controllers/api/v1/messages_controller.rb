module Api
  module V1
    class MessagesController < BaseController
      before_action :set_chat

      def index
        return render json: { errors: [ "Chat not found" ] }, status: :not_found unless @chat

        messages = @chat.messages.order(:created_at)
        render json: { messages: messages.map { |message| message_json(message) } }
      end

      def create
        return render json: { errors: [ "Chat not found" ] }, status: :not_found unless @chat

        message = @chat.messages.new(sender: current_user, content: params[:content])

        if message.save
          render json: { message: message_json(message) }, status: :created
        else
          render json: { errors: message.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def set_chat
        chat = Chat.find_by(id: params[:chat_id])
        @chat = chat if chat&.users&.include?(current_user)
      end

      def message_json(message)
        { id: message.id, chat_id: message.chat_id, sender_id: message.sender_id, content: message.content, created_at: message.created_at }
      end
    end
  end
end
