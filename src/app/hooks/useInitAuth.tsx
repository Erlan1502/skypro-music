import { useEffect } from "react";
import { useAppDispatch } from "../../store/store"
import { setAccessToken, setRefreshToken, setUsername } from "../../store/features/authSlice";

export const useInitAuth = () => {
    const dispatch = useAppDispatch();
    useEffect(()=>{
        const access = localStorage.getItem('access') || '';
        const refresh = localStorage.getItem('refresh') || '';
        const username = localStorage.getItem('username') || '';
        dispatch(setAccessToken(access));
        dispatch(setRefreshToken(refresh));
        dispatch(setUsername(username));

    }, [dispatch]);
}