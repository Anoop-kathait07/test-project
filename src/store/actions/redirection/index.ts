import { CLEAR_REDIRECTION, REDIRECT_TO } from '@/store/constants';

export const redirectTo = (path: string) => ({
    type: REDIRECT_TO,
    payload: path,
});

export const clearRedirection = () => ({
    type: CLEAR_REDIRECTION,
});