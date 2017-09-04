require 'digest'
require 'date'
require 'json'
require File.expand_path '../../models/datum.rb', __FILE__
require File.expand_path '../../models/device.rb', __FILE__

class WebhookProcessor
  attr_reader :webhook_data, :processor

  def initialize(webhook_data, processor: Particle)
    @webhook_data = webhook_data
    @processor = processor
  end

  def process
    if Device.first(external_id: data.device_external_id).nil?
      Device.new(external_id: data.device_external_id).save
    end

    data.save if data.new_event?
  end

  def data
    @data ||= Datum.new(processor.new(webhook_data).mapped_fields)
  end

  Particle = Struct.new(:webhook) do
    DEFAULT_FIELDS = {
      'published_at' => :timestamp,
      'data'         => :value,
      'coreid'       => :device_external_id
    }.freeze

    def mapped_fields
      DEFAULT_FIELDS.inject({}) do |memo, (field, mapping)|
        memo.merge(mapping => public_send(field))
      end.merge(event_id: event_id)
    end

    def published_at
      DateTime.parse(webhook.fetch('published_at'))
    end

    def event_id
      Digest::MD5.hexdigest(webhook.to_json)
    end

    def method_missing(meth, *args, &block)
      if webhook.has_key?(meth.to_s)
        webhook.fetch(meth.to_s)
      else
        super
      end
    end
  end
end
