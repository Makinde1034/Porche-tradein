/**
 * Extends window object properties for CodeCompletion.
 */
declare type window = {
    usercentrics?: {
        getConsents?: (arg0: any) => {
            consentStatus: boolean;
        };
    },
    ucConfig?: UcConfig,
    GlobalConsent?: {
        checkConsent?: (...args) => any;
        Processor?: string[];
    }
}

/**
 * Configuration object for UC Cookie Consent
 */
declare type UcConfig = {
    readMoreLabelText?: '',
    dcActive?: false,
    consentExpire?: number,
    callbacks?: {
        firstLayer?: (...args) => any;
        secondLayer?: (...args) => any;
    }
}

/**
 * Wrapper interface for ucEvent.
 *
 * This is not the complete typing of this event class can properly contain more properties
 * and more available values for the provided strings for CodeCompletion.
 */
declare interface ucEvent extends Event {
    data: {
        element: 'firstLayer' | 'secondLayer' | string;
        event: 'ui_changed' | string;
        visibility: boolean;
    }
    event: 'ui_changed' | string;
}
