document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const feedback = document.getElementById('formFeedback');

    if (!form) return;

    async function sendContact(data) {
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
            await sendContact({ name, phone, email, message });
            if (feedback) {
                feedback.textContent = 'Mensagem enviada com sucesso!';
                feedback.classList.remove('error');
            }
            form.reset();
        } catch (err) {
            if (feedback) {
                feedback.textContent = 'Não foi possível enviar. Tente novamente.';
                feedback.classList.add('error');
            }
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar';
        }
    });
});


