import { SUBMIT_ATTEMPT } from './types'

export const submitAttempt = (authData) => {
    return {
        type: SUBMIT_ATTEMPT,
        authData: authData
    }
}