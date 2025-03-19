module Jekyll
  class Test < Generator
    safe true
    priority :high

    def generate(site)
      Jekyll.logger.info "Test plugin loaded!"
    end
  end
end 