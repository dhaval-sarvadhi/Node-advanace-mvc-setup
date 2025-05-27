export default class ApiResponse {
  public static success(message: string, data: any) {
    return {
      success: true,
      message,
      data,
    };
  }

  public static fail(message: string, errors?: any) {
    return {
      success: false,
      message,
      errors,
    };
  }
}
