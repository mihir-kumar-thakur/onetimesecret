class SecretsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:burn]
  before_action :set_secret, only: [:show, :burn]

  # GET /secrets/new
  def new
    @secret = Secret.new
  end

  def show
  end

  def burn
    @secret.burn!

    head :ok
  end

  # POST /secrets or /secrets.json
  def create
    @secret = Secret.new(secret_params)

    respond_to do |format|
      if @secret.save
        format.html { redirect_to @secret, notice: "Secret was successfully created." }
        format.turbo_stream
      end
    end
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_secret
    @secret = Secret.where(token: params[:token]).take
  end

  # Only allow a list of trusted parameters through.
  def secret_params
    params.require(:secret).permit(:message)
  end
end
