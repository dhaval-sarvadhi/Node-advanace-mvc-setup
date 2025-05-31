export class ErrorController {
    public success: string;
    public error: string;
    public authFailureResponse: string;
    public unauthorizedError: string;
    public userNotFound: string;
    public EmailnotFound: string;

    // Validation messages
    public requiredFieldError: string;
    public required: string;
    public typeString: string;
    public typeNumber: string;
    public validFormate: string;
    public minLength: string;
    public maxLength: string;
    public fixedLength: string;
    public idError: string;

    // Common success messages
    public saveDataSuccess: string;
    public updatedDataSuccess: string;
    public deleteDataSuccess: string;
    public noDataFound: string;
    public successMessage: string;
    public someThingWentWrong: string;
    public DataFetched: string;

    constructor() {
        this.success = "Success.";
        this.error = "Oops! Something went wrong.";
        this.authFailureResponse = "Invalid token.";
        this.unauthorizedError = "Unauthorized access.";
        this.userNotFound = "User not found.";
        this.EmailnotFound = "Email not found.";

        this.requiredFieldError = "Please provide all required fields.";
        this.required = process.env.ecPlaceHolder + " is required.";
        this.typeString = process.env.ecPlaceHolder + " should be a string.";
        this.typeNumber = process.env.ecPlaceHolder + " should be a number.";
        this.validFormate = "Please provide valid " + process.env.ecPlaceHolder + ".";
        this.minLength = process.env.ecPlaceHolder + " should have at least " + process.env.ecPlaceHolder + " digits.";
        this.maxLength = process.env.ecPlaceHolder + " should not be more than " + process.env.ecPlaceHolder + " digits.";
        this.fixedLength = process.env.ecPlaceHolder + " must have " + process.env.ecPlaceHolder + " digits.";
        this.idError = "Please provide Id.";

        this.saveDataSuccess = "Data saved successfully.";
        this.updatedDataSuccess = "Data updated successfully.";
        this.deleteDataSuccess = "Data deleted successfully.";
        this.noDataFound = "No data found.";
        this.successMessage = "Operation completed successfully.";
        this.someThingWentWrong = "Something went wrong. Please try again.";
        this.DataFetched = "Data fetched successfully.";
 
    }

    public errorMessage(message: string, data: any[] = []) {
        const placeholder = process.env.ecPlaceHolder ?? "";
        const regex = new RegExp(placeholder, "g");
        let count = (message.match(regex) || []).length;

        for (let i = 0; i < count; i++) {
            message = message.replace(placeholder, data[i] ?? "");
        }

        return message.charAt(0).toUpperCase() + message.substring(1).toLowerCase().trim();
    }
}
