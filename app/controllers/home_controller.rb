class HomeController < ApplicationController
  def index
    @secret = Secret.new
  end
end
