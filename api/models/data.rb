class Webhook < Sequel::Model(DB[:datas])
  def self.process(webhook_data, processor: Webhook::Particle)
    data = new(processor.new(webhook_data).mapped_fields)

    if Device.first(external_id: data.device_external_id).nil?
      Device.new(external_id: data.device_external_id).save
    end

    data.save
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
      end
    end

    def published_at
      DateTime.parse(webhook.fetch('published_at'))
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
