import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from './store';
import { INewProfileStates } from './types';
import { sha256 } from "js-sha256";
import { randomHash } from '../utils/utils';

const initialState: INewProfileStates = {
  activeStep: 0,
  basicInfo: {
    name: "",
    family: "",
    id: "",
  },
  contacts: {
    numbers: [""],
    contactList: [],
  },
  agreements: {
    agreedPrivateKeyCopied: false,
    agreedSendData: false,
  },
  keys: {
    public: "",
    private: "",
    verify: "",
    tp: "",
  },
  vote: "",

  isSendingProfile: false,
  erroredSendingProfile: null,
};

export const newProfileSlice = createSlice({
  name: 'newProfile',
  initialState,
  reducers: {
    setAgreements: (state, action: PayloadAction<any>) => {
      state.agreements = { ...state.agreements, ...action.payload };
    },
    setActiveStep: (state, action: PayloadAction<any>) => {
      state.activeStep = action.payload;
    },
    changedBasicInfo: (state, action: PayloadAction<any>) => {
      state.basicInfo = { ...state.basicInfo, ...action.payload };
    },
    changedNumbers: (state, action: PayloadAction<any>) => {
      state.contacts.numbers = action.payload;
    },
    addContacts: (state, action: PayloadAction<any>) => {
      state.contacts.contactList = action.payload;
    },
    changedContacts: (state, action: PayloadAction<any>) => {
      state.contacts = { ...state.contacts, ...action.payload };
    },
    setPublicKey: (state, action: PayloadAction<any>) => {
      state.keys.public = action.payload;
    },
    setVote: (state, action: PayloadAction<any>) => {
      state.vote = action.payload;
    },
    generateKeys: (state) => {
      const v = (state.vote === "yes" ? 1 : 0)
      const privateKey = sha256(randomHash()) + v
      state.agreements.agreedPrivateKeyCopied = false
      state.agreements.agreedSendData = false
      state.keys.public = sha256(privateKey)
      state.keys.private = privateKey
      state.keys.verify = sha256(randomHash())
      state.keys.tp = sha256(randomHash())
    },
    resetNewProfile: () => {
      return initialState
    }
  },
  extraReducers: (builder) => {
  },
});

export const { changedBasicInfo, changedContacts, changedNumbers, setActiveStep,
  setPublicKey, setVote, setAgreements, generateKeys, resetNewProfile,
  addContacts } = newProfileSlice.actions;

export const selectProfile = (state: RootState) => state.newProfile;
export const selectKeys = (state: RootState) => state.newProfile.keys;
export const selectBasicInfo = (state: RootState) => state.newProfile.basicInfo;
export const selectContacts = (state: RootState) => state.newProfile.contacts;
export const selectPhoneNumbers = (state: RootState) => state.newProfile.contacts.numbers;
export const selectActiveStep = (state: RootState) => state.newProfile.activeStep;
export const selectPublicKey = (state: RootState) => selectKeys(state).public;
export const selectTpKey = (state: RootState) => selectKeys(state).tp;
export const selectPrivateKey = (state: RootState) => selectKeys(state).private;
export const selectVerifyKey = (state: RootState) => selectKeys(state).verify;
export const selectVote = (state: RootState) => state.newProfile.vote;
export const selectAgreements = (state: RootState) => state.newProfile.agreements;

export default newProfileSlice.reducer;
