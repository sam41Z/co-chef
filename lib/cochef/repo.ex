defmodule CoChef.Repo do
  use Ecto.Repo,
    otp_app: :cochef,
    adapter: Ecto.Adapters.Postgres
end
