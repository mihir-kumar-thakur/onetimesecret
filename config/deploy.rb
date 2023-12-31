# config valid for current version and patch releases of Capistrano
lock "~> 3.18.0"

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
# set :deploy_to, "/var/www/my_app_name"

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml", 'config/master.key'

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system", "vendor", "storage"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure


set :application, "onetimesecret"
set :repo_url, "git@github.com:mihir-kumar-thakur/onetimesecret.git"
set :rbenv_ruby, File.read(".ruby-version").strip

set :linked_files, fetch(:linked_files, []).push(
  "config/database.yml",
  "config/master.key"
)

set :linked_dirs, fetch(:linked_dirs, []).push(
  "log",
  "vendor/bundle",
  "public/system",
  "tmp/pids",
  "tmp/cache",
  "tmp/sockets",
  "shared",
  ".bundle"
)

set :deploy_via, :remote_cache
set :use_sudo, false

set :puma_init_active_record, true
set :puma_preload_app, true

## Defaults:
set :format, :pretty
set :log_level, :debug
set :keep_releases, 2

set :bundle_without, %w{development test}.join(':')
set :bundle_jobs, 1
set :bundle_check_before_install, false