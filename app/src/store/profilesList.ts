import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Endpoints } from '../consts';
import { PostData } from '../api/api';
import { RootState } from './store';
import { IProfilesList, IVerifyQuestionData } from './types';

const initialState: IProfilesList = {
    profiles: [],
    activeProfileIndex: -1,
    addingNew: true,

    loadingQuestions: false,
    errorLoadingQuestions: null,

    isSendingAnswer: false,
    erroedSendAnswer: null,
};

interface IAnswerData {
    questionId: string
    publicKey: string
    answer: string
    recaptchaToken: string
}

export const loadQuestions = createAsyncThunk("profiles/loadQuestions", async (publicKey: string, { rejectWithValue }) => {
    return PostData(Endpoints.ListQuestions, { publicKey }, rejectWithValue)
})

export const postAnswer = createAsyncThunk("profiles/postAnswer", async (answer: IAnswerData, { rejectWithValue }) => {
    return PostData(Endpoints.SendAnswer, answer, rejectWithValue)
})

export const profileListSlice = createSlice({
    name: 'profiles',
    initialState,
    reducers: {
        addNewProfile: (state, action: PayloadAction<any>) => {
            state.profiles = [...state.profiles, action.payload];
            state.activeProfileIndex = state.profiles.length - 1
        },
        setActiveProfileIndex: (state, action: PayloadAction<any>) => {
            state.activeProfileIndex = action.payload
        },
        removeProfile: (state, action: PayloadAction<any>) => {
            const list = [...state.profiles]
            list.splice(state.activeProfileIndex, 1)
            state.profiles = list
            if (!state.profiles.length) {
                state.activeProfileIndex = -1
            } else {
                state.activeProfileIndex = 0
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loadQuestions.pending, (state) => {
            state.loadingQuestions = true;
            state.errorLoadingQuestions = null;
        });
        builder.addCase(loadQuestions.rejected, (state) => {
            state.loadingQuestions = true;
            state.errorLoadingQuestions = null;
        });
        builder.addCase(loadQuestions.fulfilled, (state, action) => {
            state.loadingQuestions = false;
            const { errors, data: newQuestions, isOk } = action.payload
            const { profiles, activeProfileIndex } = state;
            if (isOk && activeProfileIndex > -1) {
                const questionList = [...profiles[activeProfileIndex].questions] || [];
                newQuestions.forEach((q: IVerifyQuestionData) => {
                    if (!questionList.find(pq => pq.id === q.id)) {
                        questionList.push(q)
                    }
                })
                state.profiles[activeProfileIndex].questions = questionList
            } else {
                state.errorLoadingQuestions = errors;
            }
        });


        builder.addCase(postAnswer.pending, (state) => {
            state.isSendingAnswer = true;
            state.erroedSendAnswer = null;
        });
        builder.addCase(postAnswer.rejected, (state) => {
            state.isSendingAnswer = true;
            state.erroedSendAnswer = null;
        });
        builder.addCase(postAnswer.fulfilled, (state, action) => {
            const { errors, data, isOk } = action.payload
            const { profiles, activeProfileIndex } = state
            state.isSendingAnswer = false;
            if (isOk) {
                const questionList = [...profiles[activeProfileIndex].questions] || [];
                state.profiles[activeProfileIndex].questions = questionList
            } else {
                state.errorLoadingQuestions = errors;
            }
        });
    },
});

export const { addNewProfile, setActiveProfileIndex, removeProfile } = profileListSlice.actions;

export const selectProfilesList = (state: RootState) => state.profiles.profiles;
export const selectActiveProfile = (state: RootState) => selectProfilesList(state)[state.profiles.activeProfileIndex];
export const selectQuestions = (state: RootState) => selectActiveProfile(state)?.questions;
export const selectLoadingQuestions = (state: RootState) => state.profiles.loadingQuestions;
export const selectQuestionsErrored = (state: RootState) => state.profiles.errorLoadingQuestions;

export default profileListSlice.reducer;
