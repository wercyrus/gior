export interface IBasicInfo {
    name: string;
    family: string;
    id: string;
}
export interface IContacts {
    numbers: string[];
    contactList: string[];
}

export interface IOptionData {
    value: string
    label: string
}
export interface IVerifyQuestionData {
    id: string,
    options: IOptionData[]
    question: string,
    answer?: string,
}
export interface IPostProfileData extends IBasicInfo, IContacts {
    publicKey: string,
    verifyKey: string,
    recaptchaToken: string,
}
export interface IAddedProfile {
    fullName: string,
    verifyKey: string,
    publicKey: string,
    questions: IVerifyQuestionData[],
}
export interface IProfilesList {
    profiles: IAddedProfile[];
    activeProfileIndex: number;
    addingNew: boolean;

    loadingQuestions: boolean
    errorLoadingQuestions: any

    isSendingAnswer: boolean
    erroedSendAnswer: any
}

export interface IAgreements {
    agreedPrivateKeyCopied: boolean,
    agreedSendData: boolean,
}
export interface IKeys {
    public: string;
    private: string;
    verify: string;
    tp: string;
}
export interface INewProfileStates {
    activeStep: number;
    basicInfo: IBasicInfo;
    contacts: IContacts;
    agreements: IAgreements;
    keys: IKeys;
    vote: string;
    isSendingProfile: boolean;
    erroredSendingProfile: any;
}