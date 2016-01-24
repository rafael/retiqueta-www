Rails.application.routes.draw do
  DashboardManifest::DASHBOARDS.each do |dashboard_resource|
    resources dashboard_resource
  end
  root controller: DashboardManifest::ROOT_DASHBOARD, action: :index
end
