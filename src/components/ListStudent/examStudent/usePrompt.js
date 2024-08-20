import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';

export function usePrompt(message, when) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (when) {
                const confirmationMessage = message || "nếu thoát bạn sẽ mất tiến trình";
                event.preventDefault();
                event.returnValue = confirmationMessage; // For most browsers
                return confirmationMessage; // For legacy browsers
            }
        };

        const handleNavigation = (event) => {
            if (when) {
                const confirmationMessage = message || "nếu thoát bạn sẽ mất tiến trình";
                if (window.confirm(confirmationMessage)) {
                    navigate('/student/quizzes'); // Navigate to /student/quizzes if user confirms
                } else {
                    event.preventDefault();
                }
            }
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        if (when) {
            window.history.pushState({}, '');
            window.addEventListener('popstate', handleNavigation);
        }

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            window.removeEventListener('popstate', handleNavigation);
        };
    }, [when, message, navigate]);
}
