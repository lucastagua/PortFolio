// Formulario Contacto
(function(){
    const form = document.getElementById('contactForm');
    const submitBtn = document.getElementById('submitBtn');
    const spinner = document.getElementById('submitSpinner');
    const alertBox = document.getElementById('formAlert');
    const toast = document.getElementById('toast');
    const toastCard = document.getElementById('toastCard');

    function showAlert(type, msg){
      alertBox.className = 'mb-4 alert-surface';
      if(type==='success') alertBox.classList.add('alert-success');
      if(type==='error') alertBox.classList.add('alert-error');
      alertBox.textContent = msg;
      alertBox.classList.remove('d-none');
    }
    function hideAlert(){ alertBox.classList.add('d-none'); }

    function showToast(msg, type){
      toastCard.textContent = msg;
      toastCard.className = 'toast-card ' + (type||'');
      toast.classList.remove('d-none');
      setTimeout(()=> toast.classList.add('d-none'), 2500);
    }

    form && form.addEventListener('submit', async (e)=>{
      e.preventDefault();
      hideAlert();
      submitBtn.disabled = true;
      spinner.classList.remove('d-none');
      showToast('Enviando…');

      try{
        const data = new FormData(form);
        const res = await fetch(form.action, { method: 'POST', body: data });
        const json = await res.json();

        if(json && json.success){
          form.reset();
          showAlert('success', '¡Mensaje enviado! Gracias por contactarme.');
          showToast('Enviado ✔', 'success');
        } else {
          showAlert('error', 'No se pudo enviar. Intentá nuevamente o escribime a lucasatagua@gmail.com');
          showToast('Error al enviar', 'error');
        }
      } catch(err){
        showAlert('error', 'Ocurrió un error de red. Probá de nuevo en unos minutos.');
        showToast('Error de red', 'error');
      } finally {
        submitBtn.disabled = false;
        spinner.classList.add('d-none');
      }
    });

  })();

// Intersección para revelar secciones y cards
  (function(){
    const els = document.querySelectorAll('.reveal, .project');
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('show'); });
    }, { threshold: 0.12 });
    els.forEach(el => obs.observe(el));
  })();