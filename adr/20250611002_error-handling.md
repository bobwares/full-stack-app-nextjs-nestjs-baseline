# Error Handling Envelope

**Status**: Proposed

**Date**: 2025-06-12

**Context**
Client applications and monitoring systems require a predictable error response format. NestJS default exceptions return varying shapes, complicating error handling.

**Decision**
Introduce a global `HttpExceptionFilter` formatting all errors into `{ statusCode, message, error, path, timestamp }`. The global `ValidationPipe` differentiates bad payloads (400) from validation failures (422).

**Consequences**
All endpoints return consistent JSON errors. Downstream consumers can rely on structure for retries and logging. Any non-HTTP errors become 500 responses.
