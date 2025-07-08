import { useDispatch, useSelector } from 'react-redux';

// Typed hooks for easier usage in components
export const useAppDispatch = () => useDispatch();
export const useAppSelector = useSelector;
