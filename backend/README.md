# Getthatjob

To start your Phoenix server:

- Install dependencies with `mix deps.get`
- Create and migrate your database with `mix ecto.setup`
- Start Phoenix endpoint with `mix phx.server`

Now you can visit [`localhost:4000`](http://localhost:4000) from your browser.

Ready to run in production? Please [check our deployment guides](https://hexdocs.pm/phoenix/deployment.html).

## Learn more

- Official website: https://www.phoenixframework.org/
- Guides: https://hexdocs.pm/phoenix/overview.html
- Docs: https://hexdocs.pm/phoenix
- Forum: https://elixirforum.com/c/phoenix-forum
- Source: https://github.com/phoenixframework/phoenix

## Deploy

- Prueba en servidor `sudo docker-compose -f docker-compose.yml up`
- Deploy en servidor `docker stack deploy -c ./docker-compose.yml getthatjob`
- Migrate en servidor `docker container exec -i <container> bin/getthatjob eval "Getthatjob.Release.migrate"`
