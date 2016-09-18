class Comment < ActiveRecord::Base

  ##################
  ## associations ##
  ##################

  belongs_to :user, primary_key: :uuid

  ###############
  ## Callbacks ##
  ###############

  before_create :generate_uuid

  def content
    parsed_data = JSON.parse(data)
    if parsed_data["type"] != "text_comments"
      "Don't know how to render this comment"
    else
      parsed_data["attributes"]["text"]
    end
  end

  def conversation_type
    Conversation.find(conversation_id).commentable_type
  end

  private

  def generate_uuid
    self.uuid = SecureRandom.uuid
  end
end
