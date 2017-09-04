require 'digest'

class Datum < Sequel::Model(DB[:datas])
  def new_event?
    self.class.first(event_id: event_id).nil?
  end
end
