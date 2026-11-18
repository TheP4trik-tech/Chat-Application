module Api
  module V1
    class BaseController < ApplicationController
      include ActionController::MimeResponds

      before_action :authenticate_user!
    end
  end
end
