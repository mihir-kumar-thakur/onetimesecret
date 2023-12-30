class Secret < ApplicationRecord
  validates :message, presence: true, unless: :burned
  has_secure_token :token, length: 36

  def burn!
    self.burned = true
    self.burned_at = DateTime.now
    self.message = nil

    self.save
  end
end
