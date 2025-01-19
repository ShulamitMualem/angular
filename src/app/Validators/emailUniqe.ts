import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emailUniqe(): ValidatorFn{
    return (control: AbstractControl): ValidationErrors | null => {
        if (control.value && control.value=='m') {
            return { ValueNotMatch:control.value  }
        }
        return null;
}
}