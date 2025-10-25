const campaigns = {
  outubroRosa: { 
    name: 'Outubro Rosa', 
    color: 'pink', 
    start: '2025-10-01', 
    end: '2025-10-31',
    description: 'Campanha de conscientização sobre o câncer de mama.',
    link: '#'
  },
  novembroAzul: { 
    name: 'Novembro Azul', 
    color: 'blue', 
    start: '2025-11-01', 
    end: '2025-11-30',
    description: 'Campanha voltada à saúde do homem e prevenção ao câncer de próstata.',
    link: '#'
  },
  vacinacao: { 
    name: 'Vacinação', 
    color: 'green', 
    start: '2025-10-10', 
    end: '2025-12-20',
    description: 'Campanha nacional de vacinação para todas as idades.',
    link: '#'
  }
};

const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendar-body');
const campaignSelect = document.getElementById('campaignSelect');
const legendaCampanhas = document.getElementById('legendaCampanhas');

let currentDate = new Date();

function renderCalendar() {
  const month = currentDate.getMonth();
  const year = currentDate.getFullYear();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekDay = firstDay.getDay();

  const nomeMes = firstDay.toLocaleString('pt-BR', { month: 'long', year: 'numeric' });
  monthYear.textContent = nomeMes.charAt(0).toUpperCase() + nomeMes.slice(1);
  calendarBody.innerHTML = '';

  let date = 1;
  for (let i = 0; i < 6; i++) {
    const row = document.createElement('tr');

    for (let j = 0; j < 7; j++) {
      const cell = document.createElement('td');

      if (i === 0 && j < firstWeekDay) {
        cell.textContent = '';
      } else if (date > lastDay.getDate()) {
        cell.textContent = '';
      } else {
        cell.innerHTML = `<span class="day-number">${date}</span>`;
        const cellDate = new Date(year, month, date);
        const selected = campaignSelect.value;

        // Limpa classes e estilos
        cell.className = '';
        cell.style.background = '';
        cell.style.color = '';

        if (selected === 'all') {
          // Mostra início das campanhas
          for (const key in campaigns) {
            const camp = campaigns[key];
            const start = new Date(camp.start);
            if (start.getFullYear() === year && start.getMonth() === month && start.getDate() === date) {
              cell.classList.add(`bg-${camp.color}`, 'text-white');
              cell.dataset.campaign = key;
              cell.title = `${camp.name} inicia hoje`;
            }
          }
        } else {
          // Mostra degradê progressivo da campanha selecionada
          const camp = campaigns[selected];
          const start = new Date(camp.start);
          const end = new Date(camp.end);

          if (cellDate >= start && cellDate <= end) {
            const totalDays = Math.max(1, Math.floor((end - start) / (1000 * 60 * 60 * 24)));
            const dayIndex = Math.floor((cellDate - start) / (1000 * 60 * 60 * 24));
            const progress = Math.min(1, Math.max(0, dayIndex / totalDays));

            let colorStart, colorEnd;

            switch (camp.color) {
              case 'pink':
                colorStart = `hsl(330, 90%, ${90 - progress * 40}%)`;
                colorEnd = `hsl(330, 80%, ${80 - progress * 30}%)`;
                break;
              case 'blue':
                colorStart = `hsl(210, 90%, ${90 - progress * 40}%)`;
                colorEnd = `hsl(210, 80%, ${80 - progress * 30}%)`;
                break;
              case 'green':
                colorStart = `hsl(140, 70%, ${85 - progress * 35}%)`;
                colorEnd = `hsl(140, 60%, ${75 - progress * 25}%)`;
                break;
            }

            cell.style.background = `linear-gradient(to bottom right, ${colorStart}, ${colorEnd})`;
            cell.style.color = 'white';
            cell.dataset.campaign = selected;
            cell.title = `${camp.name}`;
          }
        }

        // 🔹 Adiciona destaque no dia atual
        const today = new Date();
        if (
  cellDate.getDate() === today.getDate() &&
  cellDate.getMonth() === today.getMonth() &&
  cellDate.getFullYear() === today.getFullYear()
) {
  // garante posição relativa para o cell
  cell.style.position = 'relative';

  // cria o círculo preenchido atrás do número
  const circleBg = document.createElement('span');
  circleBg.className = 'today-circle-bg';
  cell.insertBefore(circleBg, cell.firstChild);

  // mantém o número legível por cima
  const numberSpan = cell.querySelector('.day-number');
  if (numberSpan) numberSpan.classList.add('day-number-on-circle');
}


        date++;
      }

      row.appendChild(cell);
    }

    calendarBody.appendChild(row);
  }

  atualizarLegendaDatas();
  adicionarEventosCelulas();
}

function atualizarLegendaDatas() {
  legendaCampanhas.innerHTML = '';

  const selected = campaignSelect.value;
  const formatDate = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
  };

  let campanhasExibir = [];

  if (selected === 'all') {
    campanhasExibir = Object.values(campaigns);
  } else {
    campanhasExibir.push(campaigns[selected]);
  }

  campanhasExibir.forEach(c => {
    const div = document.createElement('div');
    div.innerHTML = `
      <span class="legend bg-${c.color}"></span>
      <strong>${c.name}:</strong> ${formatDate(c.start)} até ${formatDate(c.end)}
    `;
    legendaCampanhas.appendChild(div);
  });
}

function adicionarEventosCelulas() {
  document.querySelectorAll('#calendar-body td').forEach(cell => {
    cell.addEventListener('click', () => {
      const campKey = cell.dataset.campaign;
      if (campKey) {
        const c = campaigns[campKey];
        document.getElementById('modalCampaignName').textContent = c.name;
        document.getElementById('modalCampaignPeriod').textContent = 
          `${new Date(c.start).toLocaleDateString('pt-BR')} até ${new Date(c.end).toLocaleDateString('pt-BR')}`;
        document.getElementById('modalCampaignDescription').textContent = c.description;
        document.getElementById('modalCampaignLink').href = c.link;

        // Muda a cor do cabeçalho do modal conforme a campanha
        const modalHeader = document.querySelector('.modal-header');
        modalHeader.className = 'modal-header text-white';
        modalHeader.style.background = {
          pink: 'linear-gradient(to right, #f8bbd0, #e91e63)',
          blue: 'linear-gradient(to right, #bbdefb, #1565c0)',
          green: 'linear-gradient(to right, #c8f7c5, #28a745)',
        }[c.color];

        $('#campaignModal').modal('show');
      }
    });
  });
}

// Navegação entre meses
document.getElementById('prevMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById('nextMonth').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

campaignSelect.addEventListener('change', renderCalendar);
renderCalendar();
