import { Endpoints } from "../consts";
import { INewProfileStates } from "../store/types";
import { PostData } from "./api";

export async function sendNewProfile(recaptchaToken: string, profile: INewProfileStates) {
    const { basicInfo, contacts, keys } = profile;
    const service1Data = {
        recaptchaToken,
        tpKey: keys.tp,
        verifyKey: keys.verify,
    };

    const service2Data = {
        recaptchaToken,
        tpKey: keys.tp,
        ...basicInfo,
        ...contacts,
    };

    const service3Data = {
        recaptchaToken,
        tpKey: keys.tp,
        publicKey: keys.public,
    };

    return PostData(Endpoints.service1, service1Data).then(() => {
        return PostData(Endpoints.service2, service2Data).then(() => {
            return PostData(Endpoints.service3, service3Data);
        })
    })
}