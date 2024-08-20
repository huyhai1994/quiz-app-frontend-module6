import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2';

export function usePrompt(message, when) {
    const navigate = useNavigate();

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            if (when) {
                event.preventDefault();
                event.returnValue = message;
                return message;
            }
        };

        const handleNavigation = (event) => {
            event.preventDefault();
            Swal.fire({
                title: 'Bạn có chắc chắn?',
                text: "Bạn sẽ mất tiến trình nếu rời khỏi trang này!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Rời khỏi',
                cancelButtonText: 'Ở lại',
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate(event.target.href || '/');
                }
            });
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
