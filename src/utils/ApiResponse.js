class ApiResponse {
  constructor(statusCode, data, message = "Success") {
    this.statusCode = statusCode;
    this.data = data;
    this.message = message;
    // Standard HTTP response codes below 400 indicate success
    this.success = statusCode < 400;
  }
}

export { ApiResponse };