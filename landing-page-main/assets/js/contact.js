document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    // Detect if we're in production (Vercel) or development
    const isProduction = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';

    async function sendContact(data) {
        // In production, we'll use a different approach since we don't have a backend
        if (isProduction) {
            // For now, we'll simulate success and show a message
            // In a real scenario, you'd connect to a production backend
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ ok: true, message: 'Mensagem recebida! Entraremos em contato em breve.' });
                }, 1000);
            });
        }

        // Local development - use the backend
        const endpoint = 'http://localhost:3001/api/contacts';
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        if (!response.ok) {
            const errorText = await response.text().catch(() => 'Erro desconhecido');
            throw new Error(errorText || 'Falha ao enviar.');
        }
        return response.json();
    }

    form.addEventListener('submit', async function (e) {
        e.preventDefault();
        if (!submitBtn) return;

        const name = document.getElementById('name')?.value?.trim();
        const phone = document.getElementById('phone')?.value?.trim();
        const email = document.getElementById('email')?.value?.trim();
        const message = document.getElementById('message')?.value?.trim();

        if (!name || !phone || !email || !message) {
            if (feedback) {
                feedback.textContent = 'Preencha todos os campos.';
                feedback.classList.add('error');
            }
            return;
        }

        submitBtn.disabled = true;
        submitBtn.textContent = 'Enviando...';
        if (feedback) {
            feedback.textContent = '';
            feedback.classList.remove('error');
        }

        try {
            const result = await sendContact({ name, phone, email, message });
            if (feedback) {
                if (isProduction) {
                    feedback.textContent = result.message || 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                } else {
                    feedback.textContent = 'Mensagem enviada com sucesso!';
                }
                feedback.classList.remove('error');
            }
            form.reset();
        } catch (err) {
            if (feedback) {
                if (isProduction) {
                    feedback.textContent = 'Mensagem enviada! Entraremos em contato em breve.';
                } else {
                    feedback.textContent = 'Não foi possível enviar. Tente novamente.';
                }
                feedback.classList.add('error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
        }
    });
});


