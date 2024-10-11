# Setting Up Your Self-Hosted Telemetry Server

To get started, make sure to review the [Vedro Telemetry Plugin documentation](/docs/solutions/self-hosted-telemetry) to understand how to collect telemetry data from your Vedro test runs. This plugin allows you to send telemetry events to your self-hosted server.

This guide will walk you through setting up that server using [Docker](https://docs.docker.com/engine/install/) and [Docker Compose](https://docs.docker.com/compose/install/).

### Step-by-Step Setup Process

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

The telemetry API should now be accessible at http://localhost:8080.

- Test the health check endpoint:

  ```shell
  $ curl http://localhost:8080/healthcheck
  ```

  A successful response indicates that the API is running.

#### 5. Access Grafana

Open your web browser and navigate to http://localhost:3000.

##### **Log In**

- **Username**: `admin`
- **Password**: `admin`

After logging in, you'll be prompted to change the password. Avoid using default or weak passwords, especially for non-local instances.

Grafana is pre-configured with the necessary [data sources](https://grafana.com/docs/grafana/latest/datasources/) and [dashboards](https://grafana.com/docs/grafana/latest/dashboards/), thanks to its [provisioning feature](https://grafana.com/docs/grafana/latest/administration/provisioning/). You can start exploring your telemetry data immediately.

#### 6. Visualize Data in Grafana

Once you've set up your telemetry server and started sending data from your Vedro tests (see the [Vedro Telemetry Plugin documentation](/docs/solutions/self-hosted-telemetry) for instructions on how to install and configure the plugin), you can visualize the data in Grafana.

To access the pre-configured dashboard directly, navigate to:

http://localhost:3000/d/ee090czpq6i9sf/dashboard?orgId=1

:::note
This link works if your server is running on `localhost:8080`
:::

### Data Privacy and Security

When using Vedro Telemetry, it's important to consider data privacy and security. The plugin collects and sends telemetry data about your test runs to your self-hosted server. This data can include information about your test suite, plugins used, and performance metrics.

- **Data Collected**: Test execution details, plugin usage, performance metrics, and environment information.
- **Data Storage**: Since you're using a self-hosted server, you have full control over how the data is stored and secured.
- **Security Measures**: Ensure that your telemetry server is secured with proper authentication and encryption protocols to protect sensitive information.
