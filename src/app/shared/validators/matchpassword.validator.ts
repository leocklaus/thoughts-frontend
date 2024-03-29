import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchpassword : ValidatorFn = (control: AbstractControl):ValidationErrors | null => {

    let password = control.get("password");
    let checkPassword = control.get("checkPassword");

    if(password && checkPassword && password?.value !== checkPassword?.value){
        return {
            passwordmatcherror: true,
        }
    }

    return null;
}