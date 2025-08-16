document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('form button[data-method]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // stop browser's default submit for a moment
            const form = e.target.closest('form');
            const method = button.dataset.method.toUpperCase();

            if (method === 'GET') {
                form.method = 'GET';
                form.submit();
                return;
            }

            form.method = 'POST';
            form.action = form.action + `?_method=${method}`

            form.submit(); // now actually send it
        });
    });
});
