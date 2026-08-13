# Grafana Monitoring

Grafana is used to visualize metrics collected by Prometheus.

## Recommended Metrics

Create dashboards for:

- Backend HTTP Requests
- HTTP Error Rate
- Request Rate
- Application Health
- CPU Usage
- Memory Usage
- Kubernetes Pod Status

## Prometheus Data Source

When Prometheus is deployed inside Kubernetes,
the Grafana Prometheus URL can be:

http://prometheus:9090

## Example PromQL

Total HTTP requests:

hospital_http_requests_total

Request rate:

rate(hospital_http_requests_total[5m])

## Dashboard

Recommended panels:

1. Total Requests
2. HTTP Request Rate
3. Backend Health
4. HTTP Status Codes
5. CPU Usage
6. Memory Usage