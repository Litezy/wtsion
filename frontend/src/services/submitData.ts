import { ErrorMessage, SuccessMessage } from "../utils/Notify";
import { Apis, ClientPostFormData } from "./APIS";


export const submitUserData = async (
    wallet: string,
    amount: string,
    email: string,
    screenshot: File | null
) => {
    // Frontend validations
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
        ErrorMessage("Please enter a valid BNB wallet address");
        return;
    }
    const numericAmount = Number(amount.replace(/,/g, ''));
    if (!amount || isNaN(numericAmount) || numericAmount <= 0) {
        ErrorMessage("Please enter a valid token amount.");
        return;
    }
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
        ErrorMessage("Please enter a valid email address");
        return;
    }
    if (!screenshot) {
        ErrorMessage("Please upload a screenshot");
        return;
    }
    if (screenshot.size > 5 * 1024 * 1024) {
        ErrorMessage("File must not exceed 5MB");
        return;
    }

    try {
        const formData = new FormData();
        formData.append("wallet_address", wallet);
        formData.append("amount", amount);
        formData.append("email", email);
        formData.append("screenshot", screenshot);

        const response = await ClientPostFormData(Apis.non_auth.submit_data,formData)
        console.log(response)
        if (response?.success) {
            SuccessMessage("Submission successful!");
            return response.data; // returns created user
        } else {
            ErrorMessage(response.data.error || "Submission failed");
        }
    } catch (err: any) {
        console.error(err);
        ErrorMessage(err.response?.data?.error || "Something went wrong");
    }
};
