require File.expand_path '../../spec_helper.rb', __FILE__
require File.expand_path '../../../services/webhook_processor.rb', __FILE__
require 'pry'

describe WebhookProcessor do
  let(:webhook_data) do
    {
      'event' => 'temp',
      'data' => 32,
      'published_at' => '2017-09-03T07:27:07+00:00',
      'coreid' => '2cee432402482bf0f993a2ebdfcbae5f'
    }
  end

  before do
    @processor = WebhookProcessor.new(webhook_data)
  end

  describe '#data' do
    before do
      @data = @processor.data
    end

    it 'processes particle webhook events' do
      expect(@data.timestamp.iso8601).to eq(DateTime.parse(webhook_data.fetch('published_at')).iso8601)
      expect(@data.value).to eq(32)
      expect(@data.device_external_id).to eq('2cee432402482bf0f993a2ebdfcbae5f')
      expect(@data.event_id).to eq('b948310f49987abc1b8a499c07b44e84')
    end
  end

  describe '#process' do
    it 'saves a new datum upon processing' do
      expect {
        @processor.process
      }.to change{Datum.count}.from(0).to(1)
    end

    it 'saves a new device if one doesn\'t already exist' do
      expect {
        @processor.process
      }.to change{Device.count}.from(0).to(1)
    end

    it 'does not re-create a device if device exists' do
      Device.new(external_id: '2cee432402482bf0f993a2ebdfcbae5f').save
      expect {
        @processor.process
      }.to_not change{Device.count}
    end
  end

  describe WebhookProcessor::Particle do
    it 'can accept additional information in the webhook' do
      webhook_data.merge!('super_invalid' => 'test')
      processor = WebhookProcessor::Particle.new(webhook_data)
      [
        :published_at,
        :data,
        :coreid
      ].each do |meth|
        expect(processor.send(meth)).to be_truthy
      end
    end

    it 'raises a method missing exception for non-existent keys' do
      expect {
        @processor.missing
      }.to raise_error(NameError)
    end
  end
end
