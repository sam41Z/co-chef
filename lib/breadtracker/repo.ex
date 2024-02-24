defmodule Breadtracker.Repo do
  use Ecto.Repo,
    otp_app: :breadtracker,
    adapter: Ecto.Adapters.Postgres
end
