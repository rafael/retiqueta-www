require "sidekiq/web"

Rails.application.routes.draw do
  scope module: 'admin', as: 'admin' do
    DashboardManifest::DASHBOARDS.each do |dashboard_resource|
      resources dashboard_resource
    end
    root controller: DashboardManifest::ROOT_DASHBOARD, action: :index

    Sidekiq::Web.use Rack::Auth::Basic do |username, password|
      username == ENV["ADMIN_USER"] && password == ENV["ADMIN_PASSWORD"]
    end
    mount Sidekiq::Web => '/jobs/sidekiq'
  end
end
