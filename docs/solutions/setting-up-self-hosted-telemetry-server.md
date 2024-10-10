# Setting Up Your Self-Hosted Telemetry Server

To collect and store telemetry data from your Vedro test runs, you'll need to set up a self-hosted telemetry server. This guide will walk you through the process using [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Steps

#### 1. Clone the Repository

First, clone the `vedro-telemetry-api` repository from GitHub:

```shell
$ git clone https://github.com/vedro-universe/vedro-telemetry-api.git
```

Navigate to the cloned directory:

```shell
$ cd vedro-telemetry-api
```

#### 2. Start the Services

Run the following command to start all services defined in the `docker-compose.yml` file:

```shell
$ docker-compose up -d
```

This command will download the necessary Docker images and start the containers in detached mode.

:::warning
It's recommended to change the default PostgreSQL password in the `docker-compose.yml` file for security purposes.
:::

#### 3. Verify the Setup

Check that all containers are running:

```shell
$ docker-compose ps
```

You should see that the `app`, `db`, and `grafana` services are up.

#### 4. Access the Telemetry API

The telemetry API should now be accessible at `http://localhost:8080`.

- Test the health check endpoint:

  ```shell
  $ curl http://localhost:8080/healthcheck
  ```

  A successful response indicates that the API is running.

#### 5. Access Grafana

Open your web browser and navigate to `http://localhost:3000`.

##### **Log In**

- **Username**: `admin`
- **Password**: `admin`

After logging in, you'll be prompted to change the password. Avoid using default or weak passwords, especially for non-local instances.

Grafana is pre-configured with the necessary data source and dashboards, thanks to its provisioning feature. You can start exploring your telemetry data immediately.

#### 6. Visualize Data in Grafana

Once you've set up your telemetry server and started sending data from your Vedro tests (see the [Vedro Telemetry Plugin documentation](/docs/solutions/self-hosted-telemetry) for instructions on how to install and configure the plugin), you can visualize the data in Grafana.

To access the pre-configured dashboard directly, navigate to:

```
http://localhost:3000/d/ee090czpq6i9sf/dashboard?orgId=1
```

*(This link works if your server is running on `localhost:8080`.)*

You can monitor test performance, plugin usage, scenario counts, and more through this dashboard.
