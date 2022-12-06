export default class ErrorHandlingUtil {
    constructor() {
      //NO-OP
    }
  
    getErrorMessage = (error: unknown): string => {
      if (error instanceof Error) {
        return error.message;
      }
  
      return String(error);
    };
  }
  