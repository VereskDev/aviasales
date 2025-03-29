import { setTickets, setLoading, setError } from "./ticketSlice";

export const fetchTickets = () => async (dispatch, getState) => {
  const { tickets } = getState().tickets;

  if (tickets.length > 0) {
    console.log("Билеты уже загружены, пропускаем запрос.");
    return;
  }

  try {
    dispatch(setLoading(true));

    const searchResponse = await fetch(
      "https://aviasales-test-api.kata.academy/search",
    );
    if (!searchResponse.ok) {
      throw new Error(`Ошибка получения searchId: ${searchResponse.status}`);
    }
    const { searchId } = await searchResponse.json();
    console.log("Полученный searchId:", searchId);

    let allTickets = [];
    let attempts = 0;
    const MAX_TICKETS = 20;
    const MAX_ATTEMPTS = 5;

    // Главный цикл получения билетов
    while (allTickets.length < MAX_TICKETS && attempts < MAX_ATTEMPTS) {
      try {
        const delay = Math.pow(2, attempts) * 1000;
        console.log(`Ожидаем ${delay / 1000} секунд перед следующим запросом`);
        await new Promise((resolve) => setTimeout(resolve, delay));

        const ticketResponse = await fetch(
          `https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`,
        );
        if (!ticketResponse.ok) {
          if (ticketResponse.status === 500) {
            console.warn("Ошибка 500, пробуем снова...");
            attempts += 1;
            continue; // Пробуем снова
          }
          throw new Error(`Ошибка получения билетов: ${ticketResponse.status}`);
        }

        const ticketData = await ticketResponse.json();
        console.log("Полученные билеты:", ticketData);

        if (ticketData.tickets) {
          allTickets = [...allTickets, ...ticketData.tickets].slice(
            0,
            MAX_TICKETS,
          );

          const currentTickets = getState().tickets.tickets;
          if (allTickets.length > currentTickets.length) {
            dispatch(setTickets(allTickets));
          }

          if (allTickets.length >= MAX_TICKETS) {
            console.log("Достигнут лимит билетов");
            break;
          }
        }

        if (ticketData.stop) {
          console.log("Получен stop: true от сервера. Останавливаем загрузку.");
          break;
        }
      } catch (err) {
        console.warn(`Ошибка загрузки билетов: ${err.message}`);
        attempts += 1;
        if (attempts >= MAX_ATTEMPTS) {
          console.error("максимальное количество попыток.");
          dispatch(setError("Сервер недоступен"));
          break;
        }
      }
    }

    if (allTickets.length === 0) {
      dispatch(setError("Билеты не загружены"));
    }
  } catch (error) {
    console.error("Ошибка при загрузке данных:", error);
    dispatch(setError("Ошибка загрузки данных"));
  } finally {
    dispatch(setLoading(false));
  }
};
