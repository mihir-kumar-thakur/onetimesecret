bundle exec rails assets:precompile
bundle exec rails db:migrate
bundle exec puma -C config/puma.rb