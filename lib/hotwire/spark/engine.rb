module Hotwire
  module Spark
    class Engine < ::Rails::Engine
      isolate_namespace Hotwire::Spark
    end
  end
end
