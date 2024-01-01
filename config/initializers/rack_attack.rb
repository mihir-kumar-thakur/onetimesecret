Rack::Attack.throttle("requests_by_ip", limit: 3, period: 10) do |request|
  request.ip
end
