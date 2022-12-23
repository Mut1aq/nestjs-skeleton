/* DO NOT EDIT, file generated by nestjs-i18n */

import { Path } from "nestjs-i18n";
export type I18nTranslations = {
    "auth": {
        "errors": {
            "unauthorized": string;
            "unauthenticated": string;
            "wrongEmailOrPassword": string;
        };
        "success": {
            "login": string;
            "register": string;
        };
    };
    "shared": {
        "errors": {
            "error": string;
            "user": string;
        };
        "success": {
            "success": string;
        };
        "dtos": {
            "property": {
                "fullName": string;
                "email": string;
                "password": string;
            };
            "constraint": {
                "uppercase": string;
                "lowercase": string;
                "number": string;
                "specialCharacter": string;
            };
        };
        "entities": {
            "user": string;
        };
    };
    "validation": {
        "isNotEmpty": string;
        "min": string;
        "isString": string;
        "isInt": string;
        "max": string;
        "email": string;
        "minLength": string;
        "maxLength": string;
        "uniqueEmail": string;
        "passwordContains": {
            "uppercase": string;
            "lowercase": string;
            "number": string;
            "specialCharacter": string;
        };
        "date": string;
    };
};
export type I18nPath = Path<I18nTranslations>;