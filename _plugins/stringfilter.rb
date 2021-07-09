module Jekyll
  module StringFilter
   def endswith(input, query)
     return input.end_with? query
   end

   def startswith(input, query)
    if input.nil? || input == 0 || query.nil? || query == 0
      return false
    end

    return case input
      when String
        input.start_with? query
      when Array
        input.compact.select do |f| 
          startswith(f, query)
        end
      else
        false
      end
  end

  def removeprefix(input, prefix)
    return case input
      when String
        input.delete_prefix prefix
      when Array
        input.compact.map do |f|
          removeprefix(f, prefix)
        end
      end
  end
 end
end
 
Liquid::Template.register_filter(Jekyll::StringFilter)